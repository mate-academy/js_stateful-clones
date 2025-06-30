'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        newState = addProperties(newState, extraData);
        break;
      case 'removeProperties':
        newState = removeProperties(newState, keysToRemove);
        break;
      case 'clear':
        newState = clearState();
        break;
    }

    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

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

module.exports = transformStateWithClones;
