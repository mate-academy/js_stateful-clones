'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];

  actions.forEach((action) => {
    let currentState =
      stateHistory.length === 0
        ? { ...state }
        : { ...stateHistory[stateHistory.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
