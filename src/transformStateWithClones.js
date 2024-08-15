'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES = 'addProperties';
  const REMOVE_PROPERTIES = 'removeProperties';
  const CLEAR_PROPERTIES = 'clear';

  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        currentState = { ...currentState, ...action.extraData };
        break;
      case REMOVE_PROPERTIES:
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      case CLEAR_PROPERTIES:
        currentState = {};
        break;
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
