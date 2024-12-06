'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const historyChange = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        for (const propertyToClear in stateCopy) {
          delete stateCopy[propertyToClear];
        }
        break;
      }

      case 'addProperties': {
        for (const propertyToAdd in action.extraData) {
          stateCopy[propertyToAdd] = action.extraData[propertyToAdd];
        }
        break;
      }

      case 'removeProperties': {
        for (const propertyToRemove of action.keysToRemove) {
          delete stateCopy[propertyToRemove];
        }
        break;
      }
      default:
        return 1;
    }
    historyChange.push({ ...stateCopy });
  }

  return historyChange;
}

module.exports = transformStateWithClones;
