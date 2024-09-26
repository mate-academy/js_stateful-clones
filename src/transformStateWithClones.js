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
  const previousState = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_PROPERTIES:
        Object.assign(stateCopy, extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR_PROPERTIES:
        stateCopy = {};
        break;

      default:
        throw new Error(`Action error with ${type}`);
    }
    previousState.push({ ...stateCopy });
  }

  return previousState;
}

module.exports = transformStateWithClones;
