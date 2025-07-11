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
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...currentState };
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        newState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        newState = { ...currentState };
        break;
    }

    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
