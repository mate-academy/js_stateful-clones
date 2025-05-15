'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let nowState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        nowState = {};
        break;

      case 'addProperties':
        nowState = { ...nowState };

        for (const key in action.extraData) {
          nowState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        nowState = { ...nowState };

        for (const key of action.keysToRemove) {
          delete nowState[key];
        }
        break;
    }

    stateHistory.push({ ...nowState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
