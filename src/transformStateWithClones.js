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
    switch (action.type) {
      case CLEAR_COMMAND:
        currentState = {};
        break;
      case ADD_PROPERTIES_COMMAND:
        currentState = { ...currentState, ...action.extraData };
        break;
      case REMOVE_PROPERTIES_COMMAND:
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }

        break;
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
