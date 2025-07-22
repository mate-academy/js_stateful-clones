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
        stateHistory.push(stateClone);
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };

        for (const key of act.keysToRemove) {
          delete stateClone[key];
        }

        stateHistory.push(stateClone);
        break;

      case 'clear':
        stateClone = {};
        stateHistory.push(stateClone);
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
