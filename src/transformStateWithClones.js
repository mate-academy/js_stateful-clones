'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  const newState = { ...state };
  let index = 0;

  for (const actionsObject of actions) {
    switch (actionsObject.type) {
      case 'addProperties':
        Object.assign(newState, actionsObject.extraData);
        newArray[index] = { ...newState };
        index++;
        break;
      case 'removeProperties':
        for (const toRemoveProperty of actionsObject.keysToRemove) {
          if (newState.hasOwnProperty(toRemoveProperty)) {
            delete newState[toRemoveProperty];
          }
        };
        newArray[index] = { ...newState };
        index++;
        break;
      case 'clear':
        Object.keys(newState).forEach(key => delete newState[key]);
        newArray[index] = { ...newState };
        index++;
        break;
    }
  };

  return newArray;
}

module.exports = transformStateWithClones;
