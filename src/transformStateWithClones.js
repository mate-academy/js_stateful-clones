'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentStateCopy = { ...state };

  for (const action of actions) {
    const DATA_TO_ADD = action.extraData;
    const KEYS_TO_REMOVE = action.keysToRemove;
    const newStateCopy = { ...currentStateCopy };

    switch (action.type) {
      case 'addProperties':
        addProperties(newStateCopy, DATA_TO_ADD);
        break;

      case 'removeProperties':
        removeProperties(newStateCopy, KEYS_TO_REMOVE);
        break;

      case 'clear':
        clearProperties(newStateCopy);
        break;

      default:
        throw new Error('Wrong action');
    }

    currentStateCopy = newStateCopy;

    result.push(newStateCopy);
  }

  return result;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  const properties = Object.keys(state);

  for (const key of properties) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
