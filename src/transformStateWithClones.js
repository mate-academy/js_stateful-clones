'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const REMOVE_ACTION = 'removeProperties';
  const ADD_ACTION = 'addProperties';
  const CLEAR_ACTION = 'clear';
  let currentState = { ...state };

  const stateHistory = actions.map((action) => {
    const stateCopy = { ...currentState };

    switch (action.type) {
      case ADD_ACTION:
        Object.keys(action.extraData).forEach((key) => {
          stateCopy[key] = action.extraData[key];
        });

        break;
      case REMOVE_ACTION:
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });

        break;
      case CLEAR_ACTION:
        currentState = {};

        return currentState;
      default:
        throw new Error('Unknown action type');
    }
    currentState = stateCopy;

    return stateCopy;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
