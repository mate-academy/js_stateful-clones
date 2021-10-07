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
        result.push({ ...getObjectCopy });
        break;

      case 'removeProperties':
        for (const propertyForRemove of actionObject.keysToRemove) {
          delete getObjectCopy[propertyForRemove];
        }
        result.push({ ...getObjectCopy });
        break;

      case 'clear':
        for (const key in getObjectCopy) {
          delete getObjectCopy[key];
        }
        result.push({ ...getObjectCopy });
        break;

      default:
        return 'Error';
    }
  }

  return result;
}

module.exports = transformStateWithClones;
