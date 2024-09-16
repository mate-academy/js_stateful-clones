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
    const { type, keysToRemove, extraData } = action;
    let nextState = { ...currentState };

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          nextState = { ...currentState, ...extraData };
          currentState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete nextState[key];
        }
        break;
      case 'clear':
        nextState = {};
        break;

      default:
        break;
    }

    stateHistory.push(nextState);
    currentState = { ...nextState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
