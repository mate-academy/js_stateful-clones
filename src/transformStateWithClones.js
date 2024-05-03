'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        for (const key of Object.keys(stateClone)) {
          delete stateClone[key];
        }
        break;
    }
    stateHistory.push(Object.assign({}, stateClone));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
