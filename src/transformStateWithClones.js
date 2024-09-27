'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function addProperties(state, dataToAdd) {
  Object.assign(state, dataToAdd);
}

function removeProperties(state, dataToRemove) {
  for (const key of dataToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key of Object.keys(state)) {
    delete state[key];
  }
}

function pushStateToHistory(stateHistory, state) {
  stateHistory.push(Object.assign({}, state));
}

function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateClone, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateClone, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateClone);
        break;
    }

    pushStateToHistory(stateHistory, stateClone);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
