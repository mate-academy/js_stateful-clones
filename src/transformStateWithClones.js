'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const newArray = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const data in action.extraData) {
        stateClone[data] = action.extraData[data];
      }
      newArray.push({ ...stateClone });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (stateClone[key]) {
          delete stateClone[key];
        }
      }
      newArray.push({ ...stateClone });
    }

    if (action.type === 'clear') {
      newArray.push({});
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;
