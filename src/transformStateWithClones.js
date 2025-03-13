'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let activState = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(activState, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete activState[key];
        }

        break;

      default:
        activState = {};
    }

    stateHistory.push({ ...activState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
