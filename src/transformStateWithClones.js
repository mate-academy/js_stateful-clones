'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_OPTION = 'addProperties';
  const REMOVE_OPTION = 'removeProperties';
  const CLEAR_OPTION = 'clear';
  const allState = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_OPTION:
        for (const key of Object.keys(action.extraData)) {
          newState[key] = action.extraData[key];
        }

        break;
      case REMOVE_OPTION:
        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        break;
      case CLEAR_OPTION:
        for (const key of Object.keys(newState)) {
          delete newState[key];
        }

        break;
      default:
        return 'Something wrong';
    }

    allState.push({ ...newState });
  }

  return allState;
}

module.exports = transformStateWithClones;
