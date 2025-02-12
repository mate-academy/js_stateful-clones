'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = deleteKeys({ ...currentState }, action.keysToRemove);
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }
    states.push(currentState);
  }

  return states;
}

function deleteKeys(state, keys) {
  for (const key of keys) {
    delete state[key];
  }

  return state;
}

module.exports = transformStateWithClones;
