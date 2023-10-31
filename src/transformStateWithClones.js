'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];

  const copy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      adding(copy, action);
    }

    if (action.type === 'removeProperties') {
      removing(copy, action);
    }

    if (action.type === 'clear') {
      clearing(copy);
    }

    result.push({ ...copy });
  }

  return result;
}

function adding(state, action) {
  for (const key in action.extraData) {
    state[key] = action.extraData[key];
  }
}

function removing(state, action) {
  for (const key of action.keysToRemove) {
    delete state[key];
  }
}

function clearing(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
