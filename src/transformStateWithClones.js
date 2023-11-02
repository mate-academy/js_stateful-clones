'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 */
function transformState(state, actions) {
  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        return Object.assign(state, action.extraData);

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete state[key];
        });

        return state;

      case 'clear':
        Object.keys(state).forEach(key => {
          delete state[key];
        });

        return state;

      default:
        throw new Error('Unknown action');
    }
  }
}

module.exports = transformState;
