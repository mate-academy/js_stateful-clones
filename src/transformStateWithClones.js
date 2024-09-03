'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const obj = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(obj, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;

      default:
        continue;
    }

    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
