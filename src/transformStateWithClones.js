'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = { ...state };
  const stateChangeLog = [];

  for (const key of actions) {
    const { type, extraData, keysToRemove } = key;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;
      case 'removeProperties':
        for (const item of keysToRemove) {
          delete stateClone[item];
        }
        break;
      case 'clear':
        for (const item in stateClone) {
          delete stateClone[item];
        }
        break;
      default:
        return 'Error';
    }

    stateChangeLog.push({ ...stateClone });
  }

  return stateChangeLog;
}

module.exports = transformStateWithClones;
