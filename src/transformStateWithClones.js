'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const add = 'addProperties';
  const remove = 'removeProperties';
  const clear = 'clear';
  const stateVersion = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case add:
        Object.assign(stateVersion, action.extraData);
        break;

      case remove:
        for (const keyToRemove of action.keysToRemove) {
          delete stateVersion[keyToRemove];
        }
        break;

      case clear:
        for (const key in stateVersion) {
          delete stateVersion[key];
        }
        break;

      default:
        break;
    }
    stateHistory.push({ ...stateVersion });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
