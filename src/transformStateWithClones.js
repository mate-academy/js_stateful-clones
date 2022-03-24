'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newArr = [];

  for (const item in actions) {
    newArr[item] = {};
  }
  newArr[0] = { ...state };

  for (const item in actions) {
    if (actions[item].type === 'addProperties') {
      Object.assign(newArr[item], newArr[item - 1], actions[item].extraData);
    }

    if (actions[item].type === 'removeProperties') {
      Object.assign(newArr[item], newArr[item - 1]);

      for (const key in actions[item].keysToRemove) {
        if (newArr[item][actions[item].keysToRemove[key]]) {
          delete newArr[item][actions[item].keysToRemove[key]];
        }
      }
    }

    if (actions[item].type === 'clear') {
      newArr[item] = { ...{} };
    }
  }

  return (newArr);
}

module.exports = transformStateWithClones;
