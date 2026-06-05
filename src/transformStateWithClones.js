'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateClone = Object.assign({}, state);

  for (const char of actions) {
    switch (true) {
      default:
        Object.assign(stateClone, char.extraData);
        break;

      case char.type === 'removeProperties':
        for (const i of char.keysToRemove) {
          delete stateClone[i];
        }
        break;

      case char.type === 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
