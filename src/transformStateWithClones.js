'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformState(state, actions) {
  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const x in actions[i].extraData) {
        state[x] = actions[i].extraData[x];
      }
    } else if (actions[i].type === 'removeProperties') {
      for (const x of actions[i].keysToRemove) {
        delete state[x];
      }
    } else if (actions[i].type === 'clear') {
      for (const x in state) {
        delete state[x];
      }
    }
  }
}