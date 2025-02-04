'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateClone = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      stateClone = addProperties(stateClone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      stateClone = removeProperties(stateClone, action.keysToRemove);
    }

    if (action.type === 'clear') {
      stateClone = clear(stateClone);
    }

    stateHistory.push(stateClone);
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  const stateClone = { ...state };

  for (const key in extraData) {
    stateClone[key] = extraData[key];
  }

  return stateClone;
}

function removeProperties(state, keysToRemove) {
  const stateClone = { ...state };

  for (const key of keysToRemove) {
    delete stateClone[key];
  }

  return stateClone;
}

function clear(state) {
  return {};
}

module.exports = transformStateWithClones;
