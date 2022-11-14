'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let state2 = {
    ...state,
  };

  for (const obj of actions) {
    const action = obj['type'];
    const newState = {
      ...state2,
    };

    if (action === 'addProperties') {
      addProperties(newState, obj.extraData);
    }

    if (action === 'removeProperties') {
      removeProperties(newState, obj.keysToRemove);
    }

    if (action === 'clear') {
      clear(newState);
    }

    result.push(newState);
    state2 = newState;
  }

  return result;
}

function addProperties(state, data) {
  for (const key in data) {
    state[key] = data[key];
  }
}

function removeProperties(state, toRemove) {
  for (const i of toRemove) {
    delete state[i];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
