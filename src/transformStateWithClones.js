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
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = Object.fromEntries(
          Object.entries(newState).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;

      case 'clear':
        newState = {};
        break;

      default:
        // Якщо треба сигналізувати про невідомий тип дії
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
