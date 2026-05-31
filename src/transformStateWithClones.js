'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const stateCopy = { ...currentState };

      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }

      currentState = stateCopy;
    }

    if (action.type === 'clear') {
      currentState = {};
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}





module.exports = transformStateWithClones;
