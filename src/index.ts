export type Ok<T> = { ok: T; error: null }
export type Err = { ok: null; error: Error }
export type Result<T> = Ok<T> | Err

export const Ok = <T>(result: T): Ok<T> => ({ ok: result, error: null })
export const Err = (error: Error): Err => ({ ok: null, error })

export function recover<T>(
  cb: () => T,
  handleUnknown: ((err: unknown) => Err) | undefined = undefined,
): Result<T> {
  let result: T

  try {
    result = cb()
  } catch (err) {
    if (err instanceof Error) {
      return Err(err)
    } else {
      if (handleUnknown) {
        return handleUnknown(err)
      }
    }

    return Err(new Error("Unknown error occured"))
  }

  // consider return value of NaN an error
  if (typeof result == "number") {
    if (isNaN(result)) {
      return Err(new Error("Invalid number"))
    }
  }

  return Ok(result)
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
      return Err(err)
    } else {
      if (handleUnknown) {
        return handleUnknown(err)
      }
    }

    return Err(new Error("Unknown error occured"))
  }

  // consider return value of NaN an error
  if (typeof result == "number") {
    if (isNaN(result)) {
      return Err(new Error("Invalid number"))
    }
  }

  return Ok(result)
}
