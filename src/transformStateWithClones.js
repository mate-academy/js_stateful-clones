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
    let newState = { ...currentState };

    if (action.type === 'clear') {
      newState = {};

    } else if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);

    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;

