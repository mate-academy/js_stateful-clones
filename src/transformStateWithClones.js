'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const action of actions) {
    const lastItemInArray = result[result.length - 1];

    switch (action.type) {
      case 'addProperties':
        let addedProperties;

        if (result.length === 0) {
          addedProperties = Object.assign({}, state, action.extraData);
        } else {
          addedProperties
            = Object.assign({}, lastItemInArray, action.extraData);
        }

        result.push(addedProperties);
        break;

      case 'removeProperties':
        let removedProperties;

        if (result.length === 0) {
          removedProperties = Object.assign({}, state);
        } else {
          removedProperties = Object.assign({}, lastItemInArray);
        }

        action.keysToRemove.forEach(key => delete removedProperties[key]);

        result.push(removedProperties);
        break;

      case 'clear':
        let clearedProperties;

        if (result.length === 0) {
          clearedProperties = Object.assign({}, state);
        } else {
          clearedProperties = Object.assign({}, lastItemInArray);
        }

        Object.keys(clearedProperties).forEach(key => {
          delete clearedProperties[key];
        });

        result.push(clearedProperties);
        break;

      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
