'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [];
  let currentState = { ...state };

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

    stateClone.push({ ...currentState });
  }

  return stateClone;
}

module.exports = transformStateWithClones;
