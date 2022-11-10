'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const currentState = { ...state };
  const historyOfChanges = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete currentState[prop];
        }
        break;

      case 'clear':
        for (const prop in currentState) {
          delete currentState[prop];
        }
        break;

      default:
        throw new Error(`Unknown command: ${action.type}`);
    }

    historyOfChanges.push({ ...currentState });
  }

  return historyOfChanges;
}

module.exports = transformStateWithClones;
