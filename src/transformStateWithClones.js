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
    const nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...nextState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        currentState = { ...nextState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        currentState = { ...nextState };
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
