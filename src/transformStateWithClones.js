'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copiedState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copiedState, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(copiedState, action.keysToRemove);
        break;
      case 'clear':
        clear(copiedState);
        break;
      default:
        throw new Error(`Such type of action is not found, try again`);
    }
    stateHistory.push({ ...copiedState });
  }

  return stateHistory;
}

function addProperties(state, data) {
  Object.assign(state, data);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  Object.keys(state).forEach(key => delete state[key]);
}

module.exports = transformStateWithClones;
