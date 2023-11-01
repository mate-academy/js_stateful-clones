'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateClones = [];
  const recentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(recentState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete recentState[key];
        });
        break;

      case 'clear':
        for (const key in recentState) {
          delete recentState[key];
        }
        break;
      default:
        throw new Error();
    }

    stateClones.push({ ...recentState });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
