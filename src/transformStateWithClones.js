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
    let nextState = { ...currentState };

    const actionType = action.type;

    switch (actionType) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = {
          ...nextState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push(nextState);
    currentState = nextState;
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
