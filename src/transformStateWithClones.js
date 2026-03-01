'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const historyOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clear(stateCopy);

        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    historyOfStates.push({ ...stateCopy });
  }

  return historyOfStates;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  if (!keysToRemove || keysToRemove.length === 0) {
    return;
  }

  for (const keyToRemove of keysToRemove) {
    if (keyToRemove in state) {
      delete state[keyToRemove];
    }
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
