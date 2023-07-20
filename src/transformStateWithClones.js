'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfClones = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...action.extraData,
        };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
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

    arrayOfClones.push({ ...currentState });
  }

  return arrayOfClones;
}

module.exports = transformStateWithClones;
