'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformState(state, actions) {
  for (const val of actions) {
    switch (val.type) {
      case 'addProperties':
        Object.assign(state, val.extraData);
        break;

      case 'clear':
        for (const key in state) {
          delete state[key];
        }
        break;

      case 'removeProperties':
        for (const element of val.keysToRemove) {
          delete state[element];
        }
    }
  }
}

module.exports = transformStateWithClones;
