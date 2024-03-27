'use strict';

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const stateCopy = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        addProperties(stateCopy, extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, keysToRemove);
        break;

      case 'clear':
        clearProperties(stateCopy);
        break;

      default:
        throw new Error('Action not found');
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
