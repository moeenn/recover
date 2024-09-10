import { recover, recoverAsync } from "./index"

function syncAction(arg: number): number {
  if (arg == -1) {
    throw new Error("Cannot process negative number")
  }

  return arg * 100
}

test("recover sync function: no error", () => {
  const result = recover(() => syncAction(30))
  expect(result.error).toBeNull()
  expect(result.ok).toBe(3_000)
})

test("recover sync function: error returned", () => {
  const result = recover(() => syncAction(-1))
  expect(result.ok).toBeNull()
  expect(result.error?.message).toBe("Cannot process negative number")
})

async function asyncAction(arg: number): Promise<number> {
  return new Promise((resolve, reject) => {
    if (arg == -1) {
      reject(new Error("Cannot process negative number"))
      return
    }

    resolve(arg * 100)
  })
}

test("recover async function: not error", async () => {
  const result = await recoverAsync(() => asyncAction(10))
  expect(result.error).toBeNull()
  expect(result.ok).toBe(1_000)
})

test("recover async function: error returned", async () => {
  const result = await recoverAsync(() => asyncAction(-1))
  expect(result.ok).toBeNull()
  expect(result.error).toBeInstanceOf(Error)
})

test("consider NaN value as error", async () => {
  let result = recover(() => parseInt("abc"))
  expect(result.ok).toBeFalsy()
  expect(result.error).toBeInstanceOf(Error)

  result = await recoverAsync(async () => parseFloat("xyz"))
  expect(result.ok).toBeFalsy()
  expect(result.error).toBeInstanceOf(Error)
})
