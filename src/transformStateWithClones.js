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

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const extraData = action.extraData;

      stateClone = { ...stateClone, ...extraData };
    }

    if (action.type === 'removeProperties') {
      const propertiesToRemove = action.keysToRemove;

      for (const property of propertiesToRemove) {
        delete stateClone[property];
      }
    }

    if (action.type === 'clear') {
      stateClone = {};
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
