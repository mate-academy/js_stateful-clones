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
    if (properties.type === 'addProperties') {
      Object.assign(stateCopy, properties.extraData);
    }

    if (properties.type === 'removeProperties') {
      for (const i of properties.keysToRemove) {
        delete stateCopy[i];
      }
    }

    if (properties.type === 'clear') {
      for (const i in stateCopy) {
        delete stateCopy[i];
      }
    }

    previousVersions.push({ ...stateCopy });
  }

  return previousVersions;
}

module.exports = transformStateWithClones;
