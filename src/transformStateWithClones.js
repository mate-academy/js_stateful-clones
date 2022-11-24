'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        for (const key in obj.extraData) {
          clone[key] = obj.extraData[key];
        };
        break;
      case 'removeProperties':
        obj.keysToRemove.forEach(el => delete clone[el]);
        break;
      case 'clear':
        for (const key in clone) {
          delete clone[key];
        };
        break;
      default:
        return;
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
