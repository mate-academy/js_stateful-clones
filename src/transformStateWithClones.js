'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const stateVersions = [];

  for (const object of actions) {
    const { type, extraData, keysToRemove } = object;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);

        break;
      case 'removeProperties':
        for (const toRemove of keysToRemove) {
          delete stateClone[toRemove];
        }

        break;
      case 'clear':
        stateClone = {};
    }

    stateVersions.push({ ...stateClone });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
