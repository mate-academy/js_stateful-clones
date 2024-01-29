'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const result = [];
  let currentState = { ...initialState };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties' && action.extraData) {
      currentState = {
        ...currentState, ...action.extraData,
      };
    }

    if (action.type === 'removeProperties' && action.keysToRemove) {
      const clonedState = { ...currentState };

      for (const keyToRemove of action.keysToRemove) {
        delete clonedState[keyToRemove];
      }
      currentState = clonedState;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
