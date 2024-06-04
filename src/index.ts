type ok<T> = { ok: T; error: null }
type error = { ok: null; error: Error }

/**
 * @template T
 * @param {T} result
 * @returns {ok<T>}
 */
const ok = <T>(result: T): ok<T> => ({ ok: result, error: null })

/**
 * @param {Error} error
 * @returns {error}
 */
const error = (error: Error): error => ({ ok: null, error })

/**
 * @template T
 * @param {() => T} cb
 * @returns {ok<T> | error}
 */
export function recover<T>(cb: () => T): ok<T> | error {
  let result: T

  try {
    result = cb()
  } catch (err) {
    if (err instanceof Error) {
      return error(err)
    }
    return error(new Error("Unknown error occured"))
  }

  return ok(result)
}

/**
 * @template T
 * @param {() => Promise<T>} cb
 * @returns {Promise<ok<T> | error>}
 */
export async function recoverAsync<T>(
  cb: () => Promise<T>,
): Promise<ok<T> | error> {
  let result: T

  try {
    result = await cb()
  } catch (err) {
    if (err instanceof Error) {
      return error(err)
    }
    return error(new Error("Unknown error occured"))
  }

  return ok(result)
}
