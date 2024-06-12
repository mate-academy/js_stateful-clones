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
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const newState = {};

      for (const key in currentState) {
        if (!action.keysToRemove.includes(key)) {
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
