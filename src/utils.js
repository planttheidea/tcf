/**
 * @function noop
 *
 * @description
 * utility function to return nothing
 *
 * @returns {void}
 */
export const noop = () => {};

/**
 * @function getNormalizedFunction
 *
 * @description
 * get the fn passed normalized to always be a function
 *
 * @param {any} [fn] the function to use if valid
 * @returns {function} the normalized function
 */
export const getNormalizedFunction = (fn) => (typeof fn === 'function' ? fn : noop);

/**
 * @function throws
 * 
 * @description
 * throw the error passed
 * 
 * @param {Error} error the error to throw
 */
export const throws = (error) => {
  throw error;
};
