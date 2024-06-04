type ok<T> = {
    ok: T;
    error: null;
};
declare const ok: <T>(result: T) => ok<T>;
type error = {
    ok: null;
    error: Error;
};
declare const error: (error: Error) => error;
declare function recover<T>(cb: () => T): ok<T> | error;
declare function recoverAsync<T>(cb: () => Promise<T>): Promise<ok<T> | error>;

export { recover, recoverAsync };
