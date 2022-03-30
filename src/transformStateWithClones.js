'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArr = [];
  const clone = { ...state };

  for (const obj of actions) {
    if (obj.extraData) {
      for (const key in obj.extraData) {
        clone[key] = obj.extraData[key];
      }
    }

    if (obj.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    if (obj.keysToRemove) {
      for (const key of obj.keysToRemove) {
        delete clone[key];
      }
    }

    resultArr.push({ ...clone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
