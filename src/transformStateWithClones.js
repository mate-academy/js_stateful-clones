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

  function unexpectedActionType(message) {
    stateHistory.push({ error: message });
  }

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        let tempState = { ...newState };

        for (const key of action.keysToRemove) {
          const { [key]: unusedVariable, ...rest } = tempState;

          tempState = rest;
        }
        newState = tempState;
        break;

      default:
        unexpectedActionType(`Unexpected action type: ${action.type}`);
        break;
    }
    currentState = newState;
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
