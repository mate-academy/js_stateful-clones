'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'clear') {
      currentState = {};
    } else if (type === 'addProperties') {
      currentState = { ...currentState, ...extraData };
    } else if (type === 'removeProperties') {
      const newState = { ...currentState };

      keysToRemove.forEach((key) => {
        if (newState.hasOwnProperty(key)) {
          delete newState[key];
        }
      });
      currentState = newState;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
