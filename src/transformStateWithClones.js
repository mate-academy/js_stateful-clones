'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, action) {
  const arr = [];
  const obj = { ...state };

  for (let i = 0; i < action.length; i++) {
    if (action[i].type === 'addProperties') {
      for (const key in action[i].extraData) {
        obj[key] = action[i].extraData[key];
      }
    }

    if (action[i].type === 'removeProperties') {
      for (let j = 0; j < action[i].keysToRemove.length; j++) {
        for (let key in action[i].keysToRemove[j]) {
          key = [key];
          delete obj[action[i].keysToRemove[j]];
        }
      }
    }

    if (action[i].type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
    }
    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;
