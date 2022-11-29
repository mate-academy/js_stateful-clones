'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersion = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in stateVersion) {
          delete stateVersion[key];
        }
        break;

      case 'addProperties':
        Object.assign(stateVersion, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateVersion[keyToRemove];
        }
        break;

      default:
        continue;
    }
    stateHistory.push({ ...stateVersion });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
