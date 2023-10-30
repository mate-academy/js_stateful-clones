'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const PROPERTY_ADD = 'addProperties';
  const PROPERTY_REMOVE = 'removeProperties';
  const PROPERTY_CLEAR = 'clear';
  const RESULT_OF_ACTIONS = [];

  for (const action of actions) {
    switch (action.type) {
      case PROPERTY_ADD:
        Object.assign(stateCopy, action.extraData);
        break;

      case PROPERTY_REMOVE: {
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;
      }

      case PROPERTY_CLEAR: {
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }

        break;
      }

      default:
        break;
    }

    RESULT_OF_ACTIONS.push({ ...stateCopy });
  }

  return RESULT_OF_ACTIONS;
}

module.exports = transformStateWithClones;
