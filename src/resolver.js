/**
 * @function defaultResolver
 *
 * @description
 * the built-in default resolver method
 *
 * @param {function} fn the function to resolve
 * @returns {Promise}
 */
export const defaultResolver = (fn) => new Promise((resolve) => resolve(fn()));

/**
 * @constant {Object} RESOLVER
 */
export const RESOLVER = {resolve: defaultResolver};

/**
 * @function setResolver
 *
 * @description
 * set the default resolver
 *
 * @param {function} customResolver the resolver to use in place of the standard resolver
 * @returns {boolean} was the resolver successfully set
 */
export const setResolver = (customResolver) =>
  typeof customResolver === 'function' && !!(RESOLVER.resolve = customResolver);
