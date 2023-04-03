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
      case ('addProperties'):
        copyState = Object.assign(copyState, action.extraData);
        stateHistory.push({ ...copyState });
        break;

      case ('removeProperties'):
        for (const keyToRemove of action.keysToRemove) {
          if (copyState.hasOwnProperty(keyToRemove)) {
            delete copyState[keyToRemove];
          }
        }
        stateHistory.push({ ...copyState });
        break;

      case ('clear'):
        for (const key in copyState) {
          delete copyState[key];
        }
        stateHistory.push({ ...copyState });
        break;

      default:
        return;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
