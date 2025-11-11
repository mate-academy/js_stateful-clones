'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const newState = { ...currentState };
        const keys = action.keysToRemove || [];

        for (const key of keys) {
          delete newState[key];
        }
        currentState = newState;
        break;
      }
      default:
        break;
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
