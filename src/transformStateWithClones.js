'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function addProperties(state, extraData) {
  return { ...state, ...extraData };
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clearState() {
  return {};
}

function handleAction(state, action) {
  switch (action.type) {
    case 'addProperties':
      return addProperties(state, action.extraData);

    case 'removeProperties':
      return removeProperties(state, action.keysToRemove);

    case 'clear':
      return clearState();

    default:
      return state;
  }
}

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const historyState = [];

  for (const action of actions) {
    currentState = handleAction(currentState, action);

    historyState.push({ ...currentState });
  }

  return historyState;
}

module.exports = transformStateWithClones;
