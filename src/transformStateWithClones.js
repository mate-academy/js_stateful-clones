'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const STATE_HISTORY = [];

  for (const ACTION of actions) {
    switch (ACTION.type) {
      case 'addProperties':
        // Object.assign(currentState, ACTION.extraData);
        currentState = { ...currentState, ...ACTION.extraData };
        break;

      case 'removeProperties':
        for (const KEY of ACTION.keysToRemove) {
          delete currentState[KEY];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    STATE_HISTORY.push({ ...currentState });
  }

  return STATE_HISTORY;
}
module.exports = transformStateWithClones;
