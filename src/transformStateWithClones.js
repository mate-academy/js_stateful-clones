'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        newState = { ...newState, ...actions[i].extraData };
        stateHistory.push({ ...newState });
        break;

      case 'removeProperties':
        for (let k = 0; k < actions[i].keysToRemove.length; k++) {
          if (newState.hasOwnProperty(actions[i].keysToRemove[k])) {
            delete newState[actions[i].keysToRemove[k]];
          }
        }

        stateHistory.push({ ...newState });
        break;

      case 'clear':
        newState = {};
        stateHistory.push({ ...newState });
        break;

      default:
        throw new Error();
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
