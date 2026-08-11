'use strict';

/**
 * @param {Object} updatedState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const updatedState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(updatedState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(updatedState, action.keysToRemove);
        break;

      default:
        clearProperties(updatedState);
        break;
    }
    stateHistory.push({ ...updatedState });
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
