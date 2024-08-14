# @moeenn/recover
I dislike try-catch. The syntax is clunky and inconvenient. This library provides a somewhat similar approach to error handling as Golang. I believe error handling should be as convenient as possible so we as developers are more inclined to use it in more places in our code.


## Installation
```bash
$ npm i @moeenn/recover
```


## Usage
```js
import { recover } from "@moeenn/recover"

/**
 * Example action
 * @returns {number}
 */
function syncAction() {
  return 42
}

/** @returns {void} */
function main() {
  const result = recover(() => syncAction())
  if (result.error) {
    /** in case of error, res.error will be of type Error (instead of unknown) */
    console.error("Error: ", result.error.message)
    return
  }

  /** type is automatically inferred as number */
  console.log(result.ok)
}

main()
```

```js
import { recoverAsync } from "@moeenn/recover"

/** @returns {Promise<void>} */
async function main() {
  const url = "https://jsonplaceholder.typicode.com/todos/1"
  const res = await recoverAsync(() => fetch(url))
  if (res.error) {
    console.error("Error: failed to fetch", res.error.message)
    return
  }

  const body = await recoverAsync(() => res.ok.json())
  if (body.error) {
    console.error("Error: failed to parse response as JSON", body.error.message)
    return
  }

  console.log(body.ok)
}

main().catch(console.error)
```

```js
import { recover, Ok, Err } from "@moeenn/recover"

// manually handle errors of unknown type
const result = recover(() => action(), (error: unknown): Err => {
  // convert `unknown` error into Error instance
  const err = new Error("TODO")
  return { ok: null, error: err }
})
```


## Running test
```bash
$ npm test
```