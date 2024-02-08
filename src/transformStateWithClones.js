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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState, ...extraData,
        };
        break;

      case 'removeProperties':
        const keyToRemove = keysToRemove;

        for (const key of keyToRemove) {
          delete currentState[key];
        }
        break;

      default:

        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
