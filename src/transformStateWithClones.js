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
    if (object.type === 'addProperties') {
      Object.assign(stateClone, object.extraData);

      stateVersions.push({ ...stateClone });
    } else if (object.type === 'removeProperties') {
      for (const toRemove of object.keysToRemove) {
        delete stateClone[toRemove];
      }

      stateVersions.push({ ...stateClone });
    } else if (object.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }

      stateVersions.push({ ...stateClone });
    }
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
