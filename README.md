# tcf

A functional try / catch / finally with async support

## Table of contents

- [Usage](#usage)
- [Available methods](#available-methods)
  - [tcf](#tcf)
  - [tcfAsync](#tcfasync)
  - [tcfSync](#tcfsync)
  - [setResolver](#setresolver)
- [Development](#development)

## Usage

```javascript
import tcf from "tcf";

// use for inline synchronous operations
const syncResult = tcf(
  () => {
    // ... some dangerous computation

    return computed;
  },
  (error) => console.error(error),
  () => cleanup()
);

// or for asynchronous operations
const asyncResult = await tcf(
  async () => {
    // some dangerous computation

    return computed;
  },
  (error) => console.error(error),
  async () => await cleanup()
);
```

## Available methods

#### tcf

`tcf(tryFn: function(): any[, catchFn: function(Error): any[, finallyFn: function(): any]]): any`

_Also available as the default export_

Run a `try` / `catch` / `finally` and return the result. If the result of `tryFn` is a `Promise`, then it is processed using [`tcfAsync`](#tcfasync), else it is processed using [`tcfSync`](#tcfSync). If no `catchFn` is passed, then `tryFn` is silently caught.

#### tcfAsync

`tcfAsync(tryFn: function(): Promise[, catchFn: function(Error): any[, finallyFn: function(): any]]): Promise`

_Also aliased as `tcf.async`_

Run an asynchronous `try` / `catch` / `finally` and return the result. This has the same contract as `tcfSync`, but handles `Promise` values returned from `tryFn` as well as `async` functions.

**NOTE**: This aligns with the [`Promise.prototype.finally` specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally), but also has the same contract as its synchronous counterpart, which means like in `tcf` any return from `finallyFn` will override any returns from `tryFn` or `catchFn`.

```javascript
import { tcfAsync } from "tcf";

const result = await tcfAsync(async () => "foo", null, async () => "bar");

console.log(result); // bar
```

It is recommended that you not return anything from `finallyFn` to avoid this potentially unexpected behavior. ([See this for more details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#The_finally_clause))

#### tcfSync

`tcfSync(tryFn: function(): any[, catchFn: function(Error): any[, finallyFn: function(): any]]): any`

_Also aliased as `tcf.sync`_

Run a synchronous `try` / `catch` / `finally` and return the result. If no `catchFn` is passed, then `tryFn` is silently caught.

**NOTE**: This aligns with the [specification](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch), which means that returns from the `finallyFn` function will override any returns from `tryFn` or `catchFn`.

```javascript
import { tcfSync } from "tcf";

const result = tcfSync(() => "foo", null, () => "bar");

console.log(result); // bar
```

It is recommended that you not return anything from `finallyFn` to avoid this potentially unexpected behavior. ([See this for more details](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#The_finally_clause))

#### tf

`tf(tryFn: function(): any[, finallyFn: function(): any]): any`

Run a `try` / `finally` and return the result. If the result of `tryFn` is a `Promise`, then it is processed using [`tcfAsync`](#tcfasync), else it is processed using [`tcfSync`](#tcfSync).

**NOTE**: This is exactly the same as `tcf`, but without `catch` applied. This is usefull if you still want an error to be thrown if encountered, but you also need to do cleanup.

#### tfAsync

`tfAsync(tryFn: function(): Promise[, finallyFn: function(): any]): Promise`

_Also aliased as `tf.async`_

Run an asynchronous `try` / `finally` and return the result. This has the same contract as `tfSync`, but handles `Promise` values returned from `tryFn` as well as `async` functions.

**NOTE**: This is exactly the same as `tcf`, but without `catch` applied. This is usefull if you still want an error to be thrown if encountered, but you also need to do cleanup.

```javascript
import { tfAsync } from "tcf";

const result = await tfAsync(async () => "foo", async () => "bar");

console.log(result); // bar
```

#### tfSync

`tfSync(tryFn: function(): any[, finallyFn: function(): any]): any`

_Also aliased as `tcf.sync`_

Run a synchronous `try` / `finally` and return the result.

**NOTE**: This is exactly the same as `tcf`, but without `catch` applied. This is usefull if you still want an error to be thrown if encountered, but you also need to do cleanup.

```javascript
import { tfSync } from "tcf";

const result = tfSync(() => "foo", () => "bar");

console.log(result); // bar
```

#### setResolver

`setResolver(resolver: function): boolean`

Sets a custom resolver of `tryFn` for `tcfAsync`. The default resolver internally uses native `Promise` syntax, so this function is often used when using a custom library instead.

```javascript
import Bluebird from "bluebird";
import { setResolver } from "tcf";

const customResolver = tryFn => new Bluebird(resolve => resolve(tryFn()));
```

The default resolver also creates a new promise wrapping the one returned by `tryFn`, so this method can also be used to instead leverage the existing promise.

```javascript
import { setResolver } from "tcf";

const customResolver = tryFn => tryFn;
```

## Development

Standard stuff, clone the repo and `npm install` dependencies. The npm scripts available:

- `build` => run rollup to build development `dist` files
- `clean` => run `clean:dist`, `clean:es`, and `clean:lib`
- `clean:dist` => remove all existing files in the `dist` folder
- `clean:es` => remove all existing files in the `es` folder
- `clean:lib` => remove all existing files in the `lib` folder
- `dev` => run webpack dev server to run example app / playground
- `dist` => runs `clean:dist` and `build`
- `lint` => run ESLint against all files in the `src` folder
- `lint:fix` => run ESLint against all files in the `src` folder, fixing anything it can automatically
- `prepublish` => runs `prepublish:compile` when publishing
- `prepublish:compile` => run `lint`, `test:coverage`, `transpile:lib`, `transpile:es`, and `dist`
- `test` => run AVA test functions with `NODE_ENV=test`
- `test:coverage` => run `test` but with `nyc` for coverage checker
- `test:watch` => run `test`, but with persistent watcher
- `transpile:lib` => run babel against all files in `src` to create files in `lib`
- `transpile:es` => run babel against all files in `src` to create files in `es`, preserving ES2015 modules (for
  [`pkg.module`](https://github.com/rollup/rollup/wiki/pkg.module))
