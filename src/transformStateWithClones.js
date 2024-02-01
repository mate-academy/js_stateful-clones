'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const finalStateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;
      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;
      default:
        currentState = {};
    }

    finalStateHistory.push({ ...currentState });
  }

  return finalStateHistory;
}

function addProperties(state, extraData) {
  const newState = {
    ...state,
    ...extraData,
  };

  return newState;
}

function removeProperties(state, extraData) {
  const newState = { ...state };

  for (const key of extraData) {
    delete newState[key];
  }

  return newState;
}

module.exports = transformStateWithClones;
