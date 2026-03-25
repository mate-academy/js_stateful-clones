'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTIONS = ['addProperties', 'removeProperties', 'clear'];
  const ADD_IDX = 0;
  const RMV_IDX = 1;
  const CLR_IDX = 2;

  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;
    let newState = { ...currentState };

    switch (type) {
      case ACTIONS[ADD_IDX]:
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        break;

      case ACTIONS[RMV_IDX]:
        for (const key of action.keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
        break;

      case ACTIONS[CLR_IDX]:
        newState = {};
        break;

      default:
        return;
    }
    stateHistory.push(newState);
    currentState = { ...newState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
