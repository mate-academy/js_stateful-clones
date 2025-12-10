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
    if (action.type === 'addProperties') {
      const newState = { ...currentState };

      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
      result.push(newState);
      currentState = newState;
    }

    if (action.type === 'removeProperties') {
      const newState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      result.push(newState);
      currentState = newState;
    }

    if (action.type === 'clear') {
      const newState = { ...currentState };

      for (const key in newState) {
        delete newState[key];
      }
      result.push(newState);
      currentState = newState;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
