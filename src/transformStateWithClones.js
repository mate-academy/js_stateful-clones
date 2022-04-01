'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let currentState = { ...state };
  let keys = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        keys = action.keysToRemove;

        for (const key of keys) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unsupported action type:${action.type}`);
    }

    newState.push({ ...currentState });
  }

  return newState;
}

module.exports = transformStateWithClones;
