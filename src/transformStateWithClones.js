'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const stateChangesLog = [];

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        for (const key of Object.keys(i.extraData)) {
          stateClone[key] = i.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const n of i.keysToRemove) {
          delete stateClone[n];
        }
        break;

      case 'clear':
        for (const key of Object.keys(stateClone)) {
          delete stateClone[key];
        }
        break;

      default:
        return 'error';
    }

    stateChangesLog.push({ ...stateClone });
  }

  return stateChangesLog;
}

module.exports = transformStateWithClones;
