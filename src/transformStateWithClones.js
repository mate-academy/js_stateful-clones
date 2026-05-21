'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addStateProperties(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        removeStateProperties(stateCopy, action.keysToRemove);
        break;
      case 'clear':
        clearState(stateCopy);
        break;
      default:
        throw new Error(`Unknown action type ${action.type}`);
    }
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

function addStateProperties(state, properties) {
  Object.assign(state, properties);
}

function removeStateProperties(state, keysToRemove) {
  for (const property of keysToRemove) {
    delete state[property];
  }
}

function clearState(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
