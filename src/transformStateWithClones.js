'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let currentState = { ...state }; // Create an initial copy of the state

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        currentState = clearProperties(currentState);
        break;
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  return { ...state, ...extraData }; // Create a new object with added propertie
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state }; // Clone the state

  for (const key of keysToRemove) {
    delete newState[key]; // Remove the specified keys
  }

  return newState;
}

function clearProperties(state) {
  return {}; // Return a new empty object
}

module.exports = transformStateWithClones;
