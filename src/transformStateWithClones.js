'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prev = { ...state };
  const snapshots = [];

  for (const action of actions) {
    let next;

    switch (action.type) {
      case 'clear':
        next = {};
        break;

      case 'addProperties':
        next = { ...prev, ...(action.extraData || {}) };
        break;

      case 'removeProperties':
        next = { ...prev };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete next[key];
          }
        }
        break;

      default:
        next = { ...prev };
    }

    snapshots.push(next);
    prev = next;
  }

  return snapshots;
}

module.exports = transformStateWithClones;
