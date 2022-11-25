'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrClone = [];
  const clone = {};

  for (const key in state) {
    clone[key] = state[key];
  }

  for (let i = 0; i < actions.length; i++) {
    Object.assign(clone, actions[i].extraData);

    if (actions[i].keysToRemove) {
      const arr = Object.values(actions[i].keysToRemove);

      for (let x = 0; x < arr.length; x++) {
        delete clone[arr[x]];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    const cloneNew = {};

    for (const key in clone) {
      cloneNew[key] = clone[key];
    }
    arrClone[i] = cloneNew;
  }

  return arrClone;
}

module.exports = transformStateWithClones;
