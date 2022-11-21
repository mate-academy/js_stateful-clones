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
    if (obj.type === 'addProperties') {
      for (const key in obj.extraData) {
        clone[key] = obj.extraData[key];
      }
    } else if (obj.type === 'removeProperties') {
      obj.keysToRemove.forEach(el => delete clone[el]);
    } else if (obj.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
