'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(currentState);
        break;
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

function addProperties(currentState, extraData) {
  Object.assign(currentState, extraData);
}

function removeProperties(currentState, keysToRemove) {
  for (const key of keysToRemove) {
    delete currentState[key];
  }
}

function clearProperties(currentState) {
  for (const key in currentState) {
    delete currentState[key];
  }
}

module.exports = transformStateWithClones;
