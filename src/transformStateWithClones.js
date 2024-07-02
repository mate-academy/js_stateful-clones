'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    let newState = { ...currentState };

    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        newState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    if (action.type === 'clear') {
      newState = {};
    }
    
    currentState = newState;
    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
