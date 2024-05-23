'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = {};

  Object.assign(currentState, state);

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (const i of keysToRemove) {
          delete currentState[i];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error();
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
