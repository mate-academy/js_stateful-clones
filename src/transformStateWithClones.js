'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const statesHistory = [];

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = {
          ...stateClone,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...stateClone };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        nextState = { ...stateClone };
    }

    statesHistory.push(nextState);
    stateClone = nextState;
  }

  return statesHistory;
}

module.exports = transformStateWithClones;
