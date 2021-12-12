'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    for (const key in actions[i]) {
      if (actions[i][key] === 'removeProperties') {
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete obj[actions[i].keysToRemove[j]];
        }
        arr[i] = { ...obj };
      }

      if (actions[i][key] === 'addProperties') {
        Object.assign(obj, actions[i].extraData);
        arr[i] = { ...obj };
      }

      if (actions[i][key] === 'clear') {
        for (const item in obj) {
          delete obj[item];
        }
        arr[i] = { ...obj };
      }
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
