'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copiedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(copiedState, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete copiedState[key];
        }
        break;
      }

      case 'clear': {
        for (const key in copiedState) {
          delete copiedState[key];
        }
        break;
      }

      default: {
        // Log a warning for unrecognized action types
        // console.warn(`Unrecognized action type: ${action.type}`);
      }
    }

    result.push({ ...copiedState });
  }

  return result;
}

module.exports = transformStateWithClones;
