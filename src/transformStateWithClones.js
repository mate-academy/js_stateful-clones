'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };

  const stateArray = [];

  for (const action of actions) {
    const newState = { ...currentState };

    if (action.type === 'addProperties') {
      for (const keys in action.extraData) {
        newState[keys] = action.extraData[keys];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }
    stateArray.push(newState);
    currentState = newState;
  }

  return stateArray;
}

module.exports = transformStateWithClones;
