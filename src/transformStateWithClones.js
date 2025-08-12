'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    const newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          addProperties(newState, action.extraData);
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          removeProperties(newState, action.keysToRemove);
        }
        break;

      case 'clear':
        clearProperties(newState);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory;
}

function addProperties(newState, extraData) {
  Object.assign(newState, extraData);
}

function removeProperties(newState, keysToRemove) {
  for (const key of keysToRemove) {
    delete newState[key];
  }
}

function clearProperties(newState) {
  for (const key in newState) {
    delete newState[key];
  }
}

module.exports = transformStateWithClones;
