'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;
      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;
      case 'clear':
        currentState = clear();
        break;
      default:
        break;
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  return Object.assign({}, state, extraData);
}

function removeProperties(state, keysToRemove) {
  const stateCopy = { ...state };

  for (const key of keysToRemove) {
    delete stateCopy[key];
  }

  return stateCopy;
}

function clear() {
  return {};
}

module.exports = transformStateWithClones;
