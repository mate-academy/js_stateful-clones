'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let currentState = { ...state };
  let newState;

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = { ...currentState, ...action.extraData };
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
    stateArray.push(newState);
    currentState = newState;
  }

  return stateArray;
}

module.exports = transformStateWithClones;
