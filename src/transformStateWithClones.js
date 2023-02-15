'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const ADD_PROPERTIES = 'addProperties';
const REMOVE_PROPERTIES = 'removeProperties';
const CLEAR_PROPERTIES = 'clear';

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let previousState = { ...state };

  for (const action of actions) {
    previousState = transformState(previousState, action);

    stateHistory.push({ ...previousState });
  }

  return stateHistory;
}

function transformState(state, action) {
  switch (action.type) {
    case ADD_PROPERTIES:
      return {
        ...state,
        ...action.extraData,
      };
    case REMOVE_PROPERTIES:
      const newState = { ...state };

      for (const key of action.keysToRemove) {
        delete newState[key];
      };

      return newState;
    case CLEAR_PROPERTIES:
      return {};
    default:
      throw new Error(`Unknown action type: "${action.type}"`);
  }
}

module.exports = transformStateWithClones;
