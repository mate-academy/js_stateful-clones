'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const resultStates = [];
  let currentState = { ...initialState };

  for (const action of actions) {
    let nextState = { ...currentState };

    if (action.type === 'clear') {
      nextState = {};
    } else if (action.type === 'addProperties') {
      nextState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const updatedState = { ...currentState };

      for (const keyToRemove of action.keysToRemove) {
        delete updatedState[keyToRemove];
      }

      if (Object.keys(updatedState).length === 0) {
        nextState = {};
      } else {
        nextState = updatedState;
      }
    }

    currentState = nextState;
    resultStates.push(currentState);
  }

  return resultStates;
}

module.exports = transformStateWithClones;
