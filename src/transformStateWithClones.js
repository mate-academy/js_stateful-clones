'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          copyState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete copyState[action.keysToRemove[key]];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
