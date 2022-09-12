'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    const cloneState = {};

    if (action.type === 'addProperties') {
      addProperties(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      removeProperties(newState, action.keysToRemove);
    } else if (action.type === 'clear') {
      for (const prop in newState) {
        delete newState[prop];
      }
    }

    result.push(Object.assign(cloneState, newState));
  }

  return result;
}

function addProperties(state, action) {
  for (const prop in action) {
    state[prop] = action[prop];
  }

  return state;
}

function removeProperties(state, action) {
  for (const prop of action) {
    delete state[prop];
  }
}

module.exports = transformStateWithClones;
