'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;

    if (type === 'clear') {
      currentState = {};
    } else if (type === 'addProperties') {
      const { extraData } = action;

      currentState = { ...currentState, ...extraData };
    } else {
      const { keysToRemove } = action;
      const newState = { ...currentState };

      for (const key of keysToRemove) {
        delete newState[key];
      }
      currentState = newState;
    }

    resultStates.push({ ...currentState });
  }

  return resultStates;
}

module.exports = transformStateWithClones;
