'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateHistory = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        addProperties(newState, extraData);
        stateHistory.push(Object.assign({}, newState));
        break;

      case 'removeProperties':
        removeProperties(newState, keysToRemove);
        stateHistory.push(Object.assign({}, newState));
        break;

      case 'clear':
        clearProperties(newState);
        stateHistory.push(Object.assign({}, newState));
        break;
    }
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
  for (const k in newState) {
    delete newState[k];
  }
}

module.exports = transformStateWithClones;
