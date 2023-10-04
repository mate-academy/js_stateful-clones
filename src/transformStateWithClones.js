'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPS = 'addProperties';
  const REMOVE_PROPS = 'removeProperties';
  const CLEAR_ALL_PROPS = 'clear';
  const ERROR_MESSAGE = 'Invalid action type';
  const statesArray = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_PROPS: {
        Object.assign(stateCopy, extraData);
        break;
      }

      case REMOVE_PROPS: {
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;
      }

      case CLEAR_ALL_PROPS: {
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;
      }

      default: throw new Error(ERROR_MESSAGE);
    }
    statesArray.push({ ...stateCopy });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
