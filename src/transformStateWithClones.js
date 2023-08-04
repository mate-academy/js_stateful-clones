'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD:
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case REMOVE:
        const keysToRemove = action.keysToRemove;
        const newState = { ...currentState };

        for (const key of keysToRemove) {
          delete newState[key];
        }
        currentState = newState;
        break;

      case CLEAR:
        currentState = {};
        break;

      default:
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
