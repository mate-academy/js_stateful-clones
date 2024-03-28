'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let actState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;
    const nextState = { ...actState };

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          nextState[key] = extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete nextState[key];
        }
        break;
      case 'clear':
        for (const key in nextState) {
          delete nextState[key];
        }
        break;
      default:
        break;
    }

    stateHistory.push(nextState);
    actState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
