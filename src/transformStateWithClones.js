'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const cloneArr = [];
  const stateCopy = { ...state };

  for (const obj of actions) {
    if (obj.hasOwnProperty('extraData')) {
      for (const key in obj.extraData) {
        stateCopy[key] = obj.extraData[key];
      }
    }

    if (obj.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }

    if (obj.hasOwnProperty('keysToRemove')) {
      for (const key of obj.keysToRemove) {
        delete stateCopy[key];
      }
    }

    cloneArr.push({ ...stateCopy });
  }

  return cloneArr;
}

module.exports = transformStateWithClones;
