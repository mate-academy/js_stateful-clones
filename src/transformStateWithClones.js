'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key of Object.keys(stateCopy)) {
        delete stateCopy[key];
      }
    }

    if (action.type === 'addProperties') {
      for (const data in action.extraData) {
        stateCopy[data] = action.extraData[data];
      }
    }

    if (action.type === 'removeProperties') {
      for (const data in action.keysToRemove) {
        delete stateCopy[action.keysToRemove[data]];
      }
    }
    resultArr.push({ ...stateCopy });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
