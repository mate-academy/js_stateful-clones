'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateHistory = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateClone, obj.extraData);
        stateHistory.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const item of obj.keysToRemove) {
          delete stateClone[item];
        }
        stateHistory.push({ ...stateClone });
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        stateHistory.push({ ...stateClone });
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
