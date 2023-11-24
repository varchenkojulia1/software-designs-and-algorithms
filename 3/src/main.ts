import {Either, fromPromise, ap, right, getOrElse, map, left, flatten} from './fp/either';
import {getDemands, getDistance, pipe} from './fp/utils';
import {fetchClient, fetchExecutor} from './fetching';
import {ClientUser, Demand, ExecutorUser} from './types';
import {ordNumber} from "./fp/ord";
import {InitialClient} from "./mocks";
import {fold} from "./fp/maybe";

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise(fetchClient()).then(
    (clients: Either<unknown, InitialClient[]>) => {
        return pipe(
            map((innerClient: InitialClient[]): ClientUser[] => {
                return innerClient.map((client: InitialClient): ClientUser => (
                    {...client, demands: getDemands(client)}
                ))
            })(clients)
        )
    }
);

export enum SortBy {
    distance = 'distance',
    reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
    const possibleClients: ClientUser[] = clients
        .sort((v1: ClientUser, v2: ClientUser) => ordNumber.compare(v1[sortBy], v2[sortBy])).reverse()
        .reduce((result: ClientUser[], client: ClientUser) => {
            const clientWithDemand: ClientUser = fold(
                () => client,
                (values: Demand[]) => values.some((value: Demand) => executor.possibilities.includes(value)) ? client : null
            )(client.demands);

            return clientWithDemand ? result.concat(clientWithDemand) : result;
        }, []);


    if (possibleClients.length === clients.length) {
        return right('This executor meets all demands of all clients!');
    }
    if (possibleClients.length === 0 || executor.possibilities.length === 0) {
        return left('This executor cannot meet the demands of any client!');
    }
    const header: string = `This executor meets the demands of only ${possibleClients.length} out of ${clients.length} clients` + '\n' + `
Available clients sorted by ${sortBy === SortBy.reward ? 'highest reward' : 'distance to executor'}:`;

    const resString: string = possibleClients.reduce((resultString: string, possibleClient: ClientUser) => {
        return resultString + '\n' + `name: ${possibleClient.name}, distance: ${getDistance(possibleClient.position, executor.position)}, reward: ${possibleClient.reward}`;
    }, '')
    return right(header + resString);
};

export const main = (sortBy: SortBy): Promise<string> => (
    Promise
        .all([getClients(), getExecutor()]) // Fetch clients and executor
        .then(([clients, executor]) => (
            pipe(
                /**
                 * Since the "show" function takes two parameters, the value of which is inside Either
                 * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
                 * Either is an applicative type class, which means that we can apply each parameter by one
                 */
                map(show(sortBy)), // Firstly, we need to lift our function to the Either
                // console.log,
                ap(clients), // Apply first parameter
                ap(executor), // Apply second parameter
                flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
                getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
            )
        ))
);
