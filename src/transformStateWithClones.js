'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentVersion = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    const { extraData, keysToRemove, type } = action;

    switch (type) {
      case 'clear':
        for (const key in currentVersion) {
          delete currentVersion[key];
        }
        break;

      case 'addProperties':
        Object.assign(currentVersion, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentVersion[key];
        }
        break;

      default:
        throw Error('unknown action type');
    }
    stateVersions.push({ ...currentVersion });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
