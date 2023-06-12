'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  const currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const currentAction = actions[i];

    switch (currentAction.type) {
      case 'addProperties':
        addProperties(currentState, currentAction.extraData);
        break;

      case 'removeProperties':
        removeProperties(currentState, currentAction.keysToRemove);
        break;

      case 'clear':
        clear(currentState);
        break;

      default:
        return new Error();
    }

    statesArray[i] = { ...currentState };
  }

  return statesArray;
}

function addProperties(state, data) {
  for (const key in data) {
    state[key] = data[key];
  }
}

function removeProperties(state, data) {
  for (const key in data) {
    const currentKey = data[key];

    if (state[currentKey] !== undefined) {
      delete state[currentKey];
    }
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
