// resolver
import {
  RESOLVER, setResolver
} from './resolver';

// utils
import {getNormalizedFunction} from './utils';

export {setResolver};

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
export const tcf = (tryFn, catchFn, finallyFn) => {
  try {
    return tryFn();
  } catch (error) {
    return getNormalizedFunction(catchFn)(error);
  } finally {
    const finallyResult = getNormalizedFunction(finallyFn)();

    if (finallyResult !== void 0) {
      // eslint-disable-next-line no-unsafe-finally
      return finallyResult;
    }
  }
};

/**
 * @function tcf.async
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
    .then((tryCatchResult) => {
      const finallyResult = getNormalizedFunction(finallyFn)();

      return finallyResult !== void 0 ? finallyResult : tryCatchResult;
    });

tcf.async = tcfAsync;

export default tcf;
