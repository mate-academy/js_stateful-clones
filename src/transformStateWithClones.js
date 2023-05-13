'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };

  const versionOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(action.extraData, stateCopy);
        break;

      case 'removeProperties':
        removeProperties(action.keysToRemove, stateCopy);
        break;

      case 'clear':
        clear(stateCopy);
        break;

      default:
        throw new Error(`invalid property ${action.type}`);
    }
    versionOfState.push({ ...stateCopy });
  }

  return versionOfState;
}

function addProperties(propertiesToAdd, state) {
  for (const key in propertiesToAdd) {
    state[key] = propertiesToAdd[key];
  }
}

function removeProperties(keysToRemove, state) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
