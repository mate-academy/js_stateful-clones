'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  let currentState = { ...initialState };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        const updatedState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete updatedState[key];
        }
        currentState = updatedState;
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
