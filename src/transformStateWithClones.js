'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const ADD_ACTION = 'addProperties';
const CLEAR_ACTION = 'clear';
const REMOVE_ACTION = 'removeProperties';

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let previousState = { ...state };

  for (const action of actions) {
    const newState = transformState(previousState, action);

    previousState = newState;
    stateHistory.push(newState);
  }

  return stateHistory;
}

function transformState(state, action) {
  switch (action.type) {
    case ADD_ACTION:
      return {
        ...state,
        ...action.extraData,
      };
    case REMOVE_ACTION:
      const newState = { ...state };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      return newState;
    case CLEAR_ACTION:
      return {};
    default:
      throw new Error(`Unknown action type: "${action.type}"`);
  }
}

module.exports = transformStateWithClones;
