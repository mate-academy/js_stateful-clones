'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  let stateCopy = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(stateCopy, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const i of key.keysToRemove) {
        delete stateCopy[i];
      }
    }

    if (key.type === 'clear') {
      stateCopy = {};
    }

    stateVersions.push({ ...stateCopy });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
