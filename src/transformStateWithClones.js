'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        clearState(newState);
        stateHistory.push({ ...newState });
        break;

      case 'addProperties':
        addProperties(newState, action.extraData);
        stateHistory.push({ ...newState });
        break;

      case 'removeProperties':
        removeProperties(newState, action.keysToRemove);
        stateHistory.push({ ...newState });
        break;
    }
  }

  return stateHistory;
}

function clearState(state) {
  for (const property in state) {
    delete state[property];
  }
}

function addProperties(state, extraData) {
  for (const property in extraData) {
    state[property] = extraData[property];
  }
}

function removeProperties(state, keys) {
  for (const key of keys) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
