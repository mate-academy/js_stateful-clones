'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const copyOfState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;
      case 'removeProperties':
        for (const entriesToRemove of action.keysToRemove) {
          delete copyOfState[entriesToRemove];
        }
        break;
      case 'clear':
        for (const entriesToRemove in copyOfState) {
          delete copyOfState[entriesToRemove];
        }
        break;
    }
    stateHistory.push({ ...copyOfState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
