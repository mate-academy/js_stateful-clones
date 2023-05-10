'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copiedState = {};

  Object.assign(copiedState, state);

  const versionOfState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(action.extraData, copiedState);
        break;

      case 'removeProperties':
        removeProperties(action.keysToRemove, copiedState);
        break;

      case 'clear':
        clear(copiedState);
        break;

      default:
        throw new Error(`Something went wrong :/`);
    }
    versionOfState.push({ ...copiedState });
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
