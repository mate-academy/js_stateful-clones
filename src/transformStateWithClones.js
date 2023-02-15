'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let previousState = state;

  for (const action of actions) {
    previousState = { ...previousState };

    switch (action.type) {
      case 'addProperties': {
        Object.assign(previousState, action.extraData);
        break;
      }

      case 'removeProperties': {
        action.keysToRemove.forEach(key => delete previousState[key]);
        break;
      }

      case 'clear': {
        previousState = {};
        break;
      }

      default:
    }

    stateHistory.push(previousState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
