'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const changingState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(changingState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(changingState, action.keysToRemove);
        break;

      case 'clear':
        clear(changingState);
        break;
    }

    stateHistory.push({ ...changingState });
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

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
