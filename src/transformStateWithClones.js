'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const state2 = { ...state };
  const log = [];

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties':
        Object.assign(state2, actions[action].extraData);

        const log2 = { ...state2 };

        log.push(log2);
        break;

      case 'removeProperties':
        for (const key in actions[action].keysToRemove) {
          delete state2[actions[action].keysToRemove[key]];
        }

        const log3 = { ...state2 };

        log.push(log3);

        break;

      case 'clear':
        for (const key in state2) {
          delete state2[key];
        }

        const log4 = {};

        log.push(log4);
        break;
    }
  }

  return log;
}

module.exports = transformStateWithClones;
