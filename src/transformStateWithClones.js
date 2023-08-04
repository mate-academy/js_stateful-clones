'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateClone = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        stateClone = Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties': {
        action.keysToRemove.forEach(keyToRemove => {
          delete stateClone[keyToRemove];
        });
        break;
      }

      case 'clear':
        stateClone = {};
        break;

      default:
        stateClone = 'error';
        break;
    }

    stateHistory.push({ ...stateClone });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
