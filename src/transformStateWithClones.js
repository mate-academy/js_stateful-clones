'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const stateHistory = [];

  actions.forEach(({ type, extraData, keysToRemove = [] }) => {
    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => delete currentState[key]);
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }
    stateHistory.push(structuredClone(currentState));
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
