'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove;
      const newState = {};

      for (const key in currentState) {
        if (!keysToRemove.includes(key)) {
          newState[key] = currentState[key];
        }
      }

      currentState = newState;
    }

    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;
