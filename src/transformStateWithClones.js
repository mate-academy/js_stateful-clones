'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const allStateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(curr => {
          if (stateCopy.hasOwnProperty(curr)) {
            delete stateCopy[curr];
          }

          return stateCopy;
        });
        break;

      case 'clear':
        Object.getOwnPropertyNames(stateCopy).forEach(function(prop) {
          delete stateCopy[prop];
        });
        break;

      default:
        throw Error;
    }

    allStateVersions.push({ ...stateCopy });
  }

  return allStateVersions;
}

module.exports = transformStateWithClones;
