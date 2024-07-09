'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;
      default:
        clear(stateCopy);
    }

    states.push({ ...stateCopy });
  }

  return states;
}

function addProperties(state, extraData) {
  return Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const keyToRemove of keysToRemove) {
    delete state[keyToRemove];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
