'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let recentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        recentState = {
          ...recentState,
          ...action.extraData,
        };

        newState.push({
          ...recentState,
        });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete recentState[key];
        }
        newState.push({ ...recentState });
        break;

      case 'clear':
        newState.push({});
        break;

      default:
        newState.push({});
        break;
    }
  }

  return newState;
}

module.exports = transformStateWithClones;
