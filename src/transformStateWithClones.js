'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(action.keysToRemove, stateCopy);
        break;

      case 'clear':
        clear(stateCopy);
        break;

      default:
        throw new
        Error(`Please check if the action.type - ${action.type} is correct`);
    }

    stateVersions.push({ ...stateCopy });
  }

  return stateVersions;
}

function addProperties(state, propertiesToAdd) {
  for (const property in propertiesToAdd) {
    state[property] = propertiesToAdd[property];
  }
}

function removeProperties(keysToRemove, state) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const property in state) {
    delete state[property];
  }
}

module.exports = transformStateWithClones;
