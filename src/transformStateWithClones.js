'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateVersions = [];

  for (const object of actions) {
    const { type, extraData, keysToRemove } = object;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);

        stateVersions.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const toRemove of keysToRemove) {
          delete stateClone[toRemove];
        }

        stateVersions.push({ ...stateClone });
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }

        stateVersions.push({ ...stateClone });
    }
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
