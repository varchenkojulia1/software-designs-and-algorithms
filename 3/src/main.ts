import {Either, fromPromise, ap, right, getOrElse, flatten, map, isLeft} from './fp/either';
import {getDemands, pipe, prop} from './fp/utils';
import {fetchClient, fetchExecutor} from './fetching';
import {ClientUser, ExecutorUser} from './types';
import {ordNumber} from "./fp/ord";
import {InitialClient} from "./mocks";

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise(fetchClient()).then(
    (clients: Either<string, InitialClient[]>) => {
        return pipe(
            map((innerClient: InitialClient[]) => {
                return innerClient.map((client: InitialClient): ClientUser => (
                    {...client, demands: getDemands(client) }
                ))
            })(clients),
            getOrElse((error: string) => error)
        )
    }
);

export enum SortBy {
    distance = 'distance',
    reward = 'reward',
}

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
    clients.sort((v1: ClientUser, v2: ClientUser) => ordNumber.compare(v1[sortBy], v2[sortBy]));


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
                ap(clients), // Apply first parameter
                ap(executor), // Apply second parameter
                flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
                getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
            )
        ))
);
