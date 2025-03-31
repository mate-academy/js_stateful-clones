'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const CLEAR_COMMAND = 'clear';
  const ADD_PROPERTIES_COMMAND = 'addProperties';
  const REMOVE_PROPERTIES_COMMAND = 'removeProperties';

  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === CLEAR_COMMAND) {
      currentState = {};
    } else if (action.type === ADD_PROPERTIES_COMMAND) {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === REMOVE_PROPERTIES_COMMAND) {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
