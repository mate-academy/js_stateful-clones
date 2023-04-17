'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const obj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(obj, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        delete obj[actions[i].keysToRemove[j]];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
    }
    arr.push(Object.assign({}, obj));
  }

  return arr;
}

module.exports = transformStateWithClones;
