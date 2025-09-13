'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };

  const stateHistory = [];

  for (const action of actions || {}) {
    switch (action.type) {
      case 'addProperties':
        stateClone = { ...stateClone, ...action.extraData };

        break;

      case 'removeProperties':
        const removed = { ...stateClone };

        for (const key of action.keysToRemove || []) {
          delete removed[key];
        }

        stateClone = removed;

        break;

      case 'clear':
        stateClone = {};

        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
