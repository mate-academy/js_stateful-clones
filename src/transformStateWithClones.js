'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [{ ...state }];

  for (const action of actions) {
    let currentVersion = {
      ...stateVersions[stateVersions.length - 1],
    };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentVersion, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentVersion[key];
        }
        break;
      case 'clear':
        currentVersion = {};
        break;
      default:
        throw Error('no type for action');
    }
    stateVersions.push(currentVersion);
  }

  return stateVersions.slice(1);
}

module.exports = transformStateWithClones;
