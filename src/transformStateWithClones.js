'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = [];
  let stateHistory = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateHistory = { ...stateHistory, ...action.extraData };
        break;

      case 'removeProperties':
        stateHistory = { ...stateHistory };

        for (const key of action.keysToRemove) {
          delete stateHistory[key];
        }
        break;

      case 'clear':
        stateHistory = {};
        break;

      default:
        stateHistory = { ...stateHistory };
    }

    stateCopy.push(stateHistory);
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
