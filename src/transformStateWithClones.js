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
  const resultObject = [];

  for (const item of actions) {
    switch (item.type) {
      case ADD_PROPERTIES: {
        Object.assign(stateCopy, item.extraData);
        resultObject.push({ ...stateCopy });
        break;
      }

      case REMOVE_PROPERTIES: {
        for (const key of item.keysToRemove) {
          delete stateCopy[key];
        }
        resultObject.push({ ...stateCopy });
        break;
      }

      case CLEAR: {
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        resultObject.push({});
        break;
      }

      default: {
        throw new Error('Unknown action type');
      }
    }
  }

  return resultObject;
}

module.exports = transformStateWithClones;
