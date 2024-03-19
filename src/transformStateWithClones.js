'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const typeProperty = action.type;

    if (typeProperty === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (typeProperty === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    if (typeProperty === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
