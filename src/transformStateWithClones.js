'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  const currentState = { ...state };

  for (const action of actions) {
    // currentState = { ...state };

    applyAction(currentState, action);

    results.push({ ...currentState });
  }

  return results;
}

function applyAction(currentState, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(currentState, action.extraData);
      break;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
      break;

    case 'clear':
      for (const key in currentState) {
        delete currentState[key];
      }
      break;

    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

module.exports = transformStateWithClones;
