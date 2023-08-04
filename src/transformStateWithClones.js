'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateHistory = { ...state };
  const stateChanges = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateHistory, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateHistory[key];
        }
        break;

      case 'clear':
        stateHistory = {};
        break;

      default :
        throw new Error('Invalid action type');
    }
    stateChanges.push({ ...stateHistory });
  }

  return stateChanges;
}

module.exports = transformStateWithClones;
