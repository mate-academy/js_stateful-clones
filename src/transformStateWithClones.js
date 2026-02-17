'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let prevState = state;

  for (const action of actions || []) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = { ...prevState, ...(action.extraData || {}) };
        break;

      case 'removeProperties':
        nextState = { ...prevState };

        for (const k of action.keysToRemove || []) {
          delete nextState[k];
        }
        break;

      case 'clear':
        nextState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    if (nextState !== undefined) {
      stateHistory.push(nextState);
      prevState = nextState;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
