'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState;

    if (action.type === 'addProperties') {
      newState = { ...currentState };
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      newState = { ...currentState };

      for (const keys of action.keysToRemove) {
        delete newState[keys];
      }
    }

    if (action.type === 'clear') {
      newState = {};
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
