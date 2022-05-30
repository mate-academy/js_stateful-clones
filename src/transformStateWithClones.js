'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const previousVersions = [];
  const copyState = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(copyState, key.extraData);
        break;

      case 'removeProperties':
        for (const word of key.keysToRemove) {
          delete copyState[word];
        };
        break;

      default:
        for (const prop in copyState) {
          delete copyState[prop];
        }
    }

    previousVersions.push({ ...copyState });
  }

  return previousVersions;
}

module.exports = transformStateWithClones;
