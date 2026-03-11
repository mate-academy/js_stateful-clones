'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

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
        throw new Error(`Unknown action.type: ${action.type}`);
    }

    result.push(Object.assign({}, stateCopy));
  }

  return result;
}

function addProperties(state, extraData) {
  for (const data in extraData) {
    state[data] = extraData[data];
  }
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
