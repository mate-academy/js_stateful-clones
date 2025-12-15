'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_ACTION = 'addProperties';
  const REMOVE_ACTION = 'removeProperties';
  const CLEAR_ACTION = 'clear';

  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case ADD_ACTION: {
        nextState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      }

      case REMOVE_ACTION: {
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;
      }

      case CLEAR_ACTION: {
        nextState = {};
        break;
      }

      default: {
        nextState = { ...currentState };
        break;
      }
    }

    stateHistory.push(nextState);
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
