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

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        stateClone = { ...stateClone, ...act.extraData };
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };

        for (const key of act.keysToRemove) {
          delete stateClone[key];
        }

        break;

      case 'clear':
        stateClone = {};
        break;
    }

    stateHistory.push(stateClone);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
