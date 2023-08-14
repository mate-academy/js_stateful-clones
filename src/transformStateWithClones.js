'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let currentState = { ...state }; // Creating a copy of the initial state

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          currentState = {
            ...currentState, ...action.extraData,
          };
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete currentState[key];
          }
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Adding a clone of the current state to the result array
    resultArray.push({ ...currentState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
