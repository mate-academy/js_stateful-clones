'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const nextStateAdd = {
          ...currentState,
          ...action.extraData,
        };

        result.push(nextStateAdd);
        currentState = nextStateAdd;
        break;

      case 'removeProperties':
        const nextStateRemove = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextStateRemove[key];
        }

        result.push(nextStateRemove);
        currentState = nextStateRemove;
        break;

      case 'clear':
        result.push({});
        currentState = {};
        break;

      default:
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
