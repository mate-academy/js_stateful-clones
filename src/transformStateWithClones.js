'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    const reserveState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(reserveState, action.extraData);
        break;

      case 'clear':
        for (const key in reserveState) {
          delete reserveState[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete reserveState[key];
        }
        break;
    }

    stateHistory.push(reserveState);
    currentState = { ...reserveState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
