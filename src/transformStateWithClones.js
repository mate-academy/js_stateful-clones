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
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties':
        const currentStateCopy = { ...currentState };

        action.keysToRemove.forEach((key) => delete currentStateCopy[key]);
        currentState = currentStateCopy;
        break;

      default:
        currentState = {};
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
