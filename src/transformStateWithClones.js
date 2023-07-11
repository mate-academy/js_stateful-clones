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

  const stateCopy = { ...state };
  const actionsResult = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_PROPERTIES:
        Object.assign(stateCopy, extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const property of keysToRemove) {
          delete stateCopy[property];
        }
        break;

      case CLEAR:
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;

      default:
        break;
    }

    actionsResult.push({ ...stateCopy });
  }

  return actionsResult;
}

module.exports = transformStateWithClones;
