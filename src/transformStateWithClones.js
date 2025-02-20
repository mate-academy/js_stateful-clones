'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const action of actions) {
    const copyState = { ...newState };

    switch (action.type) {
      case 'addProperties':
        addProperties(copyState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        break;

      case 'clear':
        clearState(copyState);
        break;

      default:
    }

    arr.push(copyState);
    newState = {};
    newState = { ...copyState };
  }

  return arr;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);

  return state;
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }

  return state;
}

function clearState(state) {
  for (const key in state) {
    delete state[key];
  }

  return state;
}

module.exports = transformStateWithClones;
