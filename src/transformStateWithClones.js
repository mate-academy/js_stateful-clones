'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const previousVersions = [];
  const stateCopy = { ...state };

  for (const properties of actions) {
    switch (properties.type) {
      case 'addProperties':
        Object.assign(stateCopy, properties.extraData);
        break;

      case 'removeProperties':
        for (const key of properties.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }

    previousVersions.push({ ...stateCopy });
  }

  return previousVersions;
}

module.exports = transformStateWithClones;
