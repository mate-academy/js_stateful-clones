'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newArray = [];
  const newState = { ...state };
  let index = 0;

  for (const actionsObject of actions) {
    if (actionsObject.type === 'addProperties') {
      Object.assign(newState, actionsObject.extraData);
      newArray[index] = { ...newState };
      index++;
    } else if (actionsObject.type === 'removeProperties') {
      for (const toRemoveProperty of actionsObject.keysToRemove) {
        if (newState.hasOwnProperty(toRemoveProperty)) {
          delete newState[toRemoveProperty];
        }
      }
      newArray[index] = { ...newState };
      index++;
    } else if (actionsObject.type === 'clear') {
      Object.keys(newState).forEach(key => delete newState[key]);
      newArray[index] = { ...newState };
      index++;
    }
  };

  return newArray;
}

module.exports = transformStateWithClones;
