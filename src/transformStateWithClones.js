'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(newState, action.extraData);

        break;
      }

      case 'removeProperties': {
        for (const keys of action.keysToRemove) {
          delete newState[keys];
        }
        break;
      }

      case 'clear': {
        for (const key in newState) {
          delete newState[key];
        }
        break;
      }

      default: {
        throw new Error(`unknown action type: ${action.type}`);
      }
    }
    history.push({ ...newState });
  }

  return history;
}

module.exports = transformStateWithClones;
