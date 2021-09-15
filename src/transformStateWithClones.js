'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const step = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const keys in actions[i].extraData) {
          clone[keys] = actions[i].extraData[keys];
        }
        break;

      case 'removeProperties':
        for (let y = 0; y < actions[i].keysToRemove.length; y++) {
          delete clone[actions[i].keysToRemove[y]];
        }
        break;

      case 'clear':
        for (const keys in clone) {
          delete clone[keys];
        }
        break;
    }

    step.push({ ...clone });
  }

  return step;
}

module.exports = transformStateWithClones;
