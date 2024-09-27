'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTION_TYPE_ADD_PROPERTIES = 'addProperties';
  const ACTION_TYPE_REMOVE_PROPERTIES = 'removeProperties';
  const ACTION_TYPE_CLEAR = 'clear';

  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ACTION_TYPE_ADD_PROPERTIES: {
        Object.assign(stateCopy, action.extraData);
        break;
      }
      case ACTION_TYPE_REMOVE_PROPERTIES:
        for (const removeKey of action.keysToRemove) {
          delete stateCopy[removeKey];
        }
        break;

      case ACTION_TYPE_CLEAR:
        stateCopy = {};
        break;

      default:
        continue;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
