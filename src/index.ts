export type Ok<T> = { ok: T; error: null }
export type Err = { ok: null; error: Error }
export type Result<T> = Ok<T> | Err

const ok = <T>(result: T): Ok<T> => ({ ok: result, error: null })
const error = (error: Error): Err => ({ ok: null, error })

export function recover<T>(
  cb: () => T,
  handleUnknown: ((err: unknown) => Err) | undefined = undefined,
): Result<T> {
  let result: T

  try {
    result = cb()
  } catch (err) {
    if (err instanceof Error) {
      return error(err)
    } else {
      if (handleUnknown) {
        return handleUnknown(err)
      }
    }

    return error(new Error("Unknown error occured"))
  }

  return ok(result)
}

export async function recoverAsync<T>(
  cb: () => Promise<T>,
  handleUnknown: ((err: unknown) => Err) | undefined = undefined,
): Promise<Result<T>> {
  let result: T

  try {
    result = await cb()
  } catch (err) {
    if (err instanceof Error) {
      return error(err)
    } else {
      if (handleUnknown) {
        return handleUnknown(err)
      }
    }

    return error(new Error("Unknown error occured"))
  }

  return ok(result)
}
