'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
    }

    stateHistory.push(Object.assign({}, currentState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
