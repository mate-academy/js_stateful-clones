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
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const updateState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete updateState[key];
        });

        nextState = updateState;
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        nextState = { ...currentState };
    }
    currentState = nextState;
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
