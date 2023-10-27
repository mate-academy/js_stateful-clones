'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const states = [];
  const clone = { ...state };

  for (const action of actions) {
    transform(clone, action);
    states.push({ ...clone });
  }

  return states;
}

function transform(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);
      break;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete state[key];
      }
      break;

    case 'clear':
      for (const key in state) {
        delete state[key];
      }
      break;

    default: {
      break;
    }
  }
}

module.exports = transformStateWithClones;
