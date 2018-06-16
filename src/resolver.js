/**
 * @constant {Object} RESOLVER
 */
export const RESOLVER = {resolve: (fn) => new Promise((resolve) => resolve(fn()))};

/**
 * @function setResolver
 *
 * @description
 * set the default resolver
 *
 * @param {function} customResolver the resolver to use in place of the standard resolver
 * @returns {boolean}
 */
export const setResolver = (customResolver) => (RESOLVER.resolve = customResolver) && true;
