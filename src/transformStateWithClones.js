'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let lastState = { ...state };

  for (const action of actions) {
    let next = { ...lastState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(next, action.extraData);
        stateHistory.push(next);
        lastState = next;
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete next[key];
        }
        stateHistory.push(next);
        lastState = next;
        break;

      case 'clear':
        next = {};
        lastState = next;
        stateHistory.push(next);
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
