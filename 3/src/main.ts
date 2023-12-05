import { Either, fromPromise, ap, right, getOrElse, map, flatten, left } from './fp/either';
import { pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, Demand, ExecutorUser } from './types';
import { fromCompare, ordNumber } from "./fp/ord";
import { InitialClient } from "./mocks";
import { fold, fromNullable } from "./fp/maybe";
import { distance } from "./utils";
import { sort } from "./fp/array";

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise(fetchClient()).then(
    pipe(
        map((innerClient: InitialClient[]): ClientUser[] => {
            return innerClient.map((client: InitialClient): ClientUser => (
                {...client, demands: fromNullable(client.demands)}
            ))
        })
    )
);

export enum SortBy {
    distance = 'distance',
    reward = 'reward',
}
const sortByDictionary: Object = {
    [SortBy.distance]: 'distance to executor',
    [SortBy.reward]: 'highest reward'
}

const compareByDistance = (executor: ExecutorUser) => (a: ClientUser, b: ClientUser) => (
    ordNumber.compare(distance(a.position, executor.position), distance(b.position, executor.position))
);
const compareByReward = (a: ClientUser, b: ClientUser) => (ordNumber.compare(b?.reward, a.reward));

const predicate = (sortBy: SortBy, executor: ExecutorUser) => (
    sortBy === SortBy.distance ? compareByDistance(executor) : compareByReward
);

const getPossibleClients = (clients: ClientUser[], executor: ExecutorUser): ClientUser[] => {
    return clients
        .filter((client: ClientUser) => (
            fold(
                () => true,
                (demands: Demand[]) => demands.some((demand: Demand) => executor.possibilities.includes(demand))
            )(client.demands)
        ), []);
}
function formClientMessage(possibleClients: ClientUser[], executor: ExecutorUser, sortBy: SortBy, initialClientsNumber: number): string {
    const msgHeader: string = `This executor meets the demands of only ${possibleClients.length} out of ${initialClientsNumber} clients` + '\n' + `
Available clients sorted by ${sortByDictionary[sortBy]}:`;

    return possibleClients.reduce((resultString: string, possibleClient: ClientUser) => {
        return resultString + '\n' + `name: ${possibleClient.name}, distance: ${distance(possibleClient.position, executor.position)}, reward: ${possibleClient.reward}`;
    }, msgHeader)
}

const formResultMessage = (executor: ExecutorUser, initialClientsNumber: number, sortBy: SortBy) => (possibleClients: ClientUser[]) => {
    if (possibleClients.length === initialClientsNumber) {
        return right('This executor meets all demands of all clients!');
    }
    if (possibleClients.length === 0 || executor.possibilities.length === 0) {
        return left('This executor cannot meet the demands of any client!');
    }

    return right(formClientMessage(possibleClients, executor, sortBy, initialClientsNumber));
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> =>
    pipe(
        getPossibleClients(clients, executor),
        pipe(predicate(sortBy, executor), fromCompare, sort),
        formResultMessage(executor, clients.length, sortBy)
    )

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
                right(show(sortBy)), // Firstly, we need to lift our function to the Either
                ap(clients), // Apply first parameter
                ap(executor), // Apply second parameter
                flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
                getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
            )
        ))
);
