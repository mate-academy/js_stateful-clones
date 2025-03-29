'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const newState = { ...currentState };

    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      currentState = newState;
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
        currentState = newState;
      }
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
