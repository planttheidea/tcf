# tcf CHANGELOG

## 2.0.0

#### BREAKING CHANGES

- `tcf` will now automatically handle promises returned from `tryFn` via `tcfAsync`
  - If you want to get the promise result in a synchronous way, use `tcfSync`

#### NEW FEATURES

- Have `tcf` handle both sync and async operations out of the box
- Add `tcf.sync` for when you always wanna return the sync value (even if a promise)

#### BUGFIXES

- If `finallyFn` is an `async` function, wait for it to resolve before determining result to return

## 1.0.2

- Move `in-publish` to `devDepenedencies`

## 1.0.1

- Fix publish script

## 1.0.0

- Initial release
