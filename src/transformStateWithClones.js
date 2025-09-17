'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    const previousState =
      stateHistory.length > 0 ? stateHistory[stateHistory.length - 1] : state;
    let nextState = { ...previousState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;
      case 'clear':
        nextState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push(nextState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
