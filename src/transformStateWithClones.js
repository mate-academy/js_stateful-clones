'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const statesHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        statesHistory.push(currentState);
        break;
      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        statesHistory.push(currentState);
        break;
      case 'clear':
        currentState = clearProperties(currentState);
        statesHistory.push(currentState);
        break;
    }
  }

  return statesHistory;
}

function addProperties(currentState, extraData) {
  return { ...currentState, ...extraData };
}

function removeProperties(currentState, keysToRemove) {
  const tempState = { ...currentState };

  for (const key of keysToRemove) {
    delete tempState[key];
  }

  return tempState;
}

function clearProperties(currentState) {
  const tempState = { ...currentState };

  for (const key in tempState) {
    delete tempState[key];
  }

  return tempState;
}

module.exports = transformStateWithClones;
