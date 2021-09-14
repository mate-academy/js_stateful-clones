'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const keys in actions[i].extraData) {
        clone[keys] = actions[i].extraData[keys];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (let y = 0; y < actions[i].keysToRemove.length; y++) {
        delete clone[actions[i].keysToRemove[y]];
      }
    }

    if (actions[i].type === 'clear') {
      for (const keys in clone) {
        delete clone[keys];
      }
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
