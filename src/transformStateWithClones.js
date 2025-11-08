'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = state;
  const stateHistory = [];

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        nextState = removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        nextState = clearProperties(currentState);
        break;

      default:
        throw new Error(`Unrecognized action type: ${action.type}.`);
    }

    currentState = nextState;
    stateHistory.push(nextState);
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  return { ...state, ...extraData };
}

function removeProperties(state, keysToRemove) {
  const nextState = { ...state };

  for (const key of keysToRemove) {
    delete nextState[key];
  }

  return nextState;
}

function clearProperties(state) {
  return {};
}

module.exports = transformStateWithClones;
