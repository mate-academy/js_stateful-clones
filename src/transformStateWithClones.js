'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state = {}, actions) {
  const stateHistory = [];

  for (const actionObj of actions) {
    // actionObj.type consists of addProperties, removeProperties, clear
    switch (actionObj.type) {
      case 'addProperties':
        Object.assign(state, actionObj.extraData);
        return state;
      case 'removeProperties':
        for (const key of actionObj.keysToRemove) {
          delete state[key];
        }
        return state;
      case 'clear':
        state = {};
        return state;
      default:
        return 1;
    }
  }
  return stateHistory;
}

module.exports = transformStateWithClones;
