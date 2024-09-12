'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let recentChanges = { ...state };

  for (const action of actions) {
    let nextState = {};

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = {
          ...recentChanges, ...action.extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...recentChanges };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        return stateHistory;
    }

    stateHistory.push(nextState);
    recentChanges = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
