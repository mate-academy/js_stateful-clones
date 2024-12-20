'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copyState = { ...copyState, ...action.extraData };
        break;

      case 'removeProperties':
        copyState = { ...copyState };

        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        copyState = {};
        break;
    }
    stateHistory.push({ ...copyState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
