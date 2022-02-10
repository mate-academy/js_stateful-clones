'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copy = { ...state };
  const result = [];

  for (const obj of actions) {
    const { type, extraData, keysToRemove } = obj;

    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        for (const property in copy) {
          delete copy[property];
        }
        break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
