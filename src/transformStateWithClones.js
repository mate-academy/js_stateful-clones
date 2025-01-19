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

  actions.forEach((action) => {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {};

        break;
      case 'addProperties':
        newState = { ...currentState, ...action.extraData };

        break;

      case 'removeProperties':
        newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        newState = { ...currentState };
        break;
    }

    stateHistory.push(newState);

    currentState = newState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
