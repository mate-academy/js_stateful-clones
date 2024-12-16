'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERIES_ACTION = 'addProperties';
  const REMOVE_PROPERTIES_ACTION = 'removeProperties';
  const CLEAR_ALL_ACTION = 'clear';

  const stateActionsResults = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERIES_ACTION:
        Object.assign(newState, action.extraData);
        break;

      case REMOVE_PROPERTIES_ACTION:
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case CLEAR_ALL_ACTION:
        for (const key of Object.keys(newState)) {
          delete newState[key];
        }
        break;

      default:
    }

    stateActionsResults.push({ ...newState });
  }

  return stateActionsResults;
}

module.exports = transformStateWithClones;
