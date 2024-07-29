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
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateCopy);
        break;

      default:
        // eslint-disable-next-line no-console
        console.error(`Unknown action type: ${action.type}`);
        break;
    }
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

function addProperties(state, properiesToAdd) {
  Object.assign(state, properiesToAdd);
}

function removeProperties(state, properiesToRemove) {
  for (const property of properiesToRemove) {
    delete state[property];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
