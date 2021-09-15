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
        for (const key in actions[i].extraData) {
          clone[key] = actions[i].extraData[key];
        }
        break;

      case 'removeProperties':
        for (let y = 0; y < actions[i].keysToRemove.length; y++) {
          delete clone[actions[i].keysToRemove[y]];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }

    step.push({ ...clone });
  }

  return step;
}

module.exports = transformStateWithClones;
