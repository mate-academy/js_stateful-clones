'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        cloneState = {};
        break;

      case 'addProperties':
        cloneState = {
          ...cloneState,
          ...action.extraData,
        };
        break;

      case 'removeProperties': {
        const newState = { ...cloneState };

        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        cloneState = newState;
        break;
      }

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...cloneState });
  }

  return history;
}

module.exports = transformStateWithClones;
