'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action.extraData);
        stateHistory.push({ ...currentState });
        break;

      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        stateHistory.push({ ...currentState });
        break;

      case 'clear':
        clearProperties(currentState);
        stateHistory.push({ ...currentState });
        break;
    }
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
