'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const stateClone = { ...state };

  for (const object of actions) {
    if (object.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    if (object.type === 'addProperties') {
      for (const key in object.extraData) {
        stateClone[key] = object.extraData[key];
      }
    }

    if (object.type === 'removeProperties') {
      for (const key of object.keysToRemove) {
        if (key in stateClone) {
          delete stateClone[key];
        }
      }
    }

    resultArray.push({ ...stateClone });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
