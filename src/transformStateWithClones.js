'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let current = { ...state };

  for (const action of actions) {
    let next = { ...current };

    switch (action.type) {
      case 'clear':
        next = {};
        break;

      case 'addProperties':
        Object.assign(next, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete next[key]);
        break;
      default:
        break;
    }

    stateHistory.push(next);

    current = next;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
