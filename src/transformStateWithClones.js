'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(initialState, actions) {
  const history = [];
  let state = { ...initialState };

  const ActionType = {
    ADD_PROPERTIES: 'addProperties',
    REMOVE_PROPERTIES: 'removeProperties',
    CLEAR_STATE: 'clear',
  };

  for (const action of actions) {
    switch (action.type) {
      case ActionType.ADD_PROPERTIES:
        state = { ...state, ...action.extraData };
        break;
      case ActionType.REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete state[key];
        }
        break;
      case ActionType.CLEAR_STATE:
        state = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    history.push({ ...state });
  }

  return history;
}

module.exports = transformStateWithClones;
