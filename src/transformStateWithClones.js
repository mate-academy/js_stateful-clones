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
  const CLEAR = 'clear';

  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTIES:
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }
        break;

      case REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case CLEAR:
        currentState = {};
        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
