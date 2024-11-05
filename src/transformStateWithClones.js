'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type } = action;

    switch (type) {
      case 'addProperties': {
        const { extraData: propertiesToAdd } = action;

        currentState = { ...currentState, ...propertiesToAdd };
        break;
      }

      case 'removeProperties': {
        const { keysToRemove: propertiesToRemove } = action;

        for (const key of propertiesToRemove) {
          delete currentState[key];
        }
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }
      default:
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
