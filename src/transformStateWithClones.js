'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const stateHistory = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(copyState, action.extraData);
        break;
      }

      case 'removeProperties': {
        action.keysToRemove.forEach(key => {
          delete copyState[key];
        });
        break;
      }

      case 'clear': {
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      }

      default:
        throw new Error(`Sorry i don't know this statement: ${action.type}`);
    }

    stateHistory.push({ ...copyState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
