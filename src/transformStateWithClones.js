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
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_OPTION:
        for (const key of Object.keys(action.extraData)) {
          stateCopy[key] = action.extraData[key];
        }

        break;
      case REMOVE_OPTION:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;
      case CLEAR_OPTION:
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }

        break;
      default:
        throw Error();
    }

    allState.push({ ...stateCopy });
  }

  return allState;
}

module.exports = transformStateWithClones;
