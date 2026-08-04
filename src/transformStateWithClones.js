'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneOfState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneOfState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneOfState[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(cloneOfState)) {
          delete cloneOfState[key];
        }
        break;
    }

    stateHistory.push({ ...cloneOfState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
