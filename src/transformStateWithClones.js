'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopies = [];

  for (const action of actions) {
    const stateCopy = stateCopies.length
      ? { ...stateCopies[stateCopies.length - 1] }
      : { ...state };

    switch (action.type) {
      case 'addProperties':
        for (const propertyName in action.extraData) {
          stateCopy[propertyName] = action.extraData[propertyName];
        }
        break;
      case 'removeProperties':
        for (const propertyName of action.keysToRemove) {
          delete stateCopy[propertyName];
        }
        break;
      case 'clear':
        for (const propertyName in stateCopy) {
          delete stateCopy[propertyName];
        }
        break;
      default:
        // Unknown action type - do nothing
        break;
    }

    stateCopies.push(stateCopy);
  }

  return stateCopies;
}

module.exports = transformStateWithClones;
