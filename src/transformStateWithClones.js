'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const STRING_ADD_CASE = 'addProperties';
  const STRING_REMOVE_CASE = 'removeProperties';
  const STRING_CLEAR_CASE = 'clear';
  const stateClone = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case STRING_ADD_CASE: {
        for (const key in action.extraData) {
          stateClone[key] = action.extraData[key];
        }
        break;
      }

      case STRING_REMOVE_CASE: {
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
      }

      case STRING_CLEAR_CASE: {
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      }

      default:
        continue;
    }

    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
