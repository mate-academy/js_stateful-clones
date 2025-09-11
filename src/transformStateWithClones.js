'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copyState = { ...state };

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = { ...copyState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...copyState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push(newState);
    copyState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
