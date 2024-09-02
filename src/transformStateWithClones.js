'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        cloneState = {
          ...cloneState,
          ...action.extraData,
        };

        break;

      case 'removeProperties':
        cloneState = removeProperties(cloneState, action.keysToRemove);

        break;

      case 'clear':
        cloneState = {};

        break;

      default:
        stateHistory.push({
          error: `Unknown action type: ${action.type}`,
          state: cloneState,
        });

        return stateHistory;
    }
    stateHistory.push({ ...cloneState });
  }

  return stateHistory;
}

function removeProperties(originalObject, keysToRemove) {
  const newObject = { ...originalObject };

  for (const key of keysToRemove) {
    delete newObject[key];
  }

  return newObject;
}

module.exports = transformStateWithClones;
