'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let newState = { ...state };

  for (const actionsObject of actions) {
    switch (actionsObject.type) {
      case 'addProperties':
        Object.assign(newState, actionsObject.extraData);
        newArray.push({ ...newState });
        break;
      case 'removeProperties':
        for (const toRemoveProperty of actionsObject.keysToRemove) {
          if (newState.hasOwnProperty(toRemoveProperty)) {
            delete newState[toRemoveProperty];
          }
        };
        newArray.push({ ...newState });
        break;
      case 'clear':
        newState = {};
        newArray.push({ ...newState });
        break;
    }
  };

  return newArray;
}

module.exports = transformStateWithClones;
