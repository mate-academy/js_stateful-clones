'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let objState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      objState = { ...objState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      objState = { ...objState };

      for (const key of action.keysToRemove) {
        delete objState[key];
      }
    }

    if (action.type === 'clear') {
      objState = {};
    }

    stateHistory.push({ ...objState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
