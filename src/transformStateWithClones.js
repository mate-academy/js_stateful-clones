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
    switch (action.type) {
      case 'addProperties': {
        const extraData = action.extraData;

        stateClone = { ...stateClone, ...extraData };
        break;
      }

      case 'removeProperties': {
        const propertiesToRemove = action.keysToRemove;

        for (const property of propertiesToRemove) {
          delete stateClone[property];
        }
        break;
      }

      case 'clear': {
        stateClone = {};
        break;
      }
    }
    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
