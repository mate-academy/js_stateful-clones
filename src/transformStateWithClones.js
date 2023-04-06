'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let obj = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        obj = Object.assign(obj, extraData);
        break;

      case 'removeProperties':
        for (const char of keysToRemove) {
          delete obj[char];
        }
        break;

      case 'clear':
        obj = {};
        break;

      default:
        obj = { ...state };
    }

    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
