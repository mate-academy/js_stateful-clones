'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const getObjectCopy = { ...state };
  const result = [];

  for (const actionObject of actions) {
    switch (actionObject.type) {
      case 'addProperties':
        for (const key in actionObject.extraData) {
          getObjectCopy[key] = actionObject.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const propertyForRemove of actionObject.keysToRemove) {
          delete getObjectCopy[propertyForRemove];
        }
        break;

      case 'clear':
        for (const key in getObjectCopy) {
          delete getObjectCopy[key];
        }
        break;

      default:
        return 'Error';
    }
    result.push({ ...getObjectCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
