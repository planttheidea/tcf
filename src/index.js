// resolver
import {
  RESOLVER, setResolver
} from './resolver';

// utils
import {getNormalizedFunction} from './utils';

/**
 * @function tcfAsync
 *
 * @description
 * async version of tcf, with built-in resolver
 *
 * @param {function} tryFn the function to try to execute
 * @param {function} [catchFn] the function to fire if tryFn fails
 * @param {function} [finallyFn] the function to fire after try / catch fires
 * @returns {Promise}
 */
export const tcfAsync = (tryFn, catchFn, finallyFn) =>
  RESOLVER.resolve(tryFn)
    .catch((error) => getNormalizedFunction(catchFn)(error))
    .then(
      (tryCatchResult) =>
        typeof finallyFn === 'function'
          ? RESOLVER.resolve(finallyFn).then(
            (finallyResult) => (finallyResult !== void 0 ? finallyResult : tryCatchResult)
          )
          : tryCatchResult
    );

export const createTcf = (isSyncOnly) =>
  /**
   * @function tcf
   *
   * @description
   * functional try / catch / finally that matches the spec
   *
   * @param {function} tryFn the function to try to execute
   * @param {function} [catchFn] the function to fire if tryFn fails
   * @param {function} [finallyFn] the function to fire after try / catch fires
   * @returns {any}
   */
  (tryFn, catchFn, finallyFn) => {
    let isPromise = false;

    try {
      const result = tryFn();

      isPromise = !isSyncOnly && result && typeof result.then === 'function';

      return isPromise ? tcfAsync(() => result, catchFn, finallyFn) : result;
    } catch (error) {
      return getNormalizedFunction(catchFn)(error);
    } finally {
      if (!isPromise) {
        const finallyResult = getNormalizedFunction(finallyFn)();

        if (finallyResult !== void 0) {
          // eslint-disable-next-line no-unsafe-finally
          return finallyResult;
        }
      }
    }
  };

export const tcfSync = createTcf(true);

export const tcf = createTcf(false);

tcf.async = tcfAsync;
tcf.sync = tcfSync;

export {setResolver};

export default tcf;
