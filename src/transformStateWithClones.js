'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const states = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const updatedState = { ...newState };

      for (const keyToRemove of action.keysToRemove) {
        delete updatedState[keyToRemove];
      }
      newState = updatedState;
    } else if (action.type === 'clear') {
      newState = {};
    }
    states.push({ ...newState });
  }

  return states;
}

module.exports = transformStateWithClones;
