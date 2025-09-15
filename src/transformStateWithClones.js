'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  for (const action in actions) {
    if (action.type === 'clear') {
      for (const key in state) {
        delete state[key];
      }
    }

    if (action.type === 'addProperties') {
      Object.assign(state, action.extraData);
    }

    if (action.type === 'keysToRemove') {
      for (const key in action.removeProperties) {
        delete state[key];
      }
    }
  }
}

module.exports = transformStateWithClones;
