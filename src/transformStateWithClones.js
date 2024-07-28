'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

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
        return 'Error';
    }

    result.push({ ...stateCopy });
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

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
