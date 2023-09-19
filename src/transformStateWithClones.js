'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    const ADD_PROPERTIES = 'addProperties';
    const REMOVE_PROPERTIES = 'removeProperties';
    const CLEAR = 'clear';

    switch (action.type) {
      case ADD_PROPERTIES:
        Object.assign(stateCopy, action.extraData);
        break;

      case REMOVE_PROPERTIES:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR:
        stateCopy = {};
        break;

      default:
        throw new Error('Invalid action type');
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
