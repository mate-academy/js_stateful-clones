'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateLog = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }

        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }

        break;
      case 'clear':
        for (const key in newState) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }

        break;
    }

    stateLog.push({ ...newState });
  }

  return stateLog;
}

module.exports = transformStateWithClones;
