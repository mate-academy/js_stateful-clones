'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(cloneState, action.extraData);

        break;

      case 'removeProperties':
        removeProperties(cloneState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(cloneState, action.clearProperties);
        break;

      default:
        continue;
    }
    stateHistory.push({ ...cloneState });
  }

  return stateHistory;
}

function addProperties(cloneState, extraData) {
  Object.assign(cloneState, extraData);
}

function removeProperties(cloneState, keysToRemove) {
  for (const key of keysToRemove) {
    delete cloneState[key];
  }
}

function clearProperties(cloneState) {
  for (const key in cloneState) {
    delete cloneState[key];
  }
}

module.exports = transformStateWithClones;
