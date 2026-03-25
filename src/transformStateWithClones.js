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
    const { type } = action;
    let newState = { ...currentState };

    switch (type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }
    stateHistory.push(newState);
    currentState = { ...newState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
