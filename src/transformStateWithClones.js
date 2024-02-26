'use strict';

/**
 * @param {Object} initialState
 * @param {Object[]} actions
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let currentState = { ...initialState };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = {
          ...currentState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        nextState = currentState;
    }

    stateHistory.push({ ...nextState });
    currentState = { ...nextState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
