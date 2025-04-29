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
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(action.extraData)) {
          newState[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }

    stateHistory.push(newState);
    currentState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
