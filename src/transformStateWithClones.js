'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateClone = { ...state };

  for (const action of actions) {
    if (action.extraData) {
      for (const key in action.extraData) {
        stateClone[key] = action.extraData[key];
      }

      result.push({ ...stateClone });
    }

    if (action.keysToRemove) {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        if (stateClone[action.keysToRemove[i]]) {
          delete stateClone[action.keysToRemove[i]];
        }
      }

      result.push({ ...stateClone });
    }

    if (action.type === 'clear') {
      for (const keys in stateClone) {
        delete stateClone[keys];
      }

      result.push({ ...stateClone });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
