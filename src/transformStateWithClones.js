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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        clear(currentState);
        break;

      default:
        return new Error("Something went wrond! Please check your data!");
    }

    statesArray.push({ ...currentState });
  }

  return statesArray;
}

function addProperties(state, data) {
  for (const key in data) {
    state[key] = data[key];
  }
}

function removeProperties(state, data) {
  for (const key of data) {
    if (state[key] !== undefined) {
      delete state[key];
    }
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
