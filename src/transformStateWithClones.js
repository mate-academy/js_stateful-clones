'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let currentState = {};

  for (const key in state) {
    currentState[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      const newState = {};

      for (const key in currentState) {
        newState[key] = currentState[key];
      }

      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }

      currentState = newState;
    }

    if (action.type === 'removeProperties') {
      const newState = {};

      for (const key in currentState) {
        if (!action.keysToRemove.includes(key)) {
          newState[key] = currentState[key];
        }
      }

      currentState = newState;
    }

    // After each action, make a copy of current state and add to result
    const stateCopy = {};

    for (const key in currentState) {
      stateCopy[key] = currentState[key];
    }
    result.push(stateCopy);
  }

  return result;
}
module.exports = transformStateWithClones;
