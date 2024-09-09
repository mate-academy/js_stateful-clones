'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const nextState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear': {
        Object.keys(nextState).forEach((key) => {
          delete nextState[key];
        });
        break;
      }

      case 'addProperties': {
        Object.assign(nextState, action.extraData);
        break;
      }

      case 'removeProperties': {
        action.keysToRemove.forEach((key) => {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        });
        break;
      }

      default:
        break;
    }

    stateHistory.push({ ...nextState });
  });

  return stateHistory;
}
module.exports = transformStateWithClones;
