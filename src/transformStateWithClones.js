'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  const obj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(obj, actions[i].extraData);
    }

    if (actions[i].type === 'clear') {
      for (const a in obj) {
        delete obj[a];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const removeKey of actions[i].keysToRemove) {
        if (removeKey in obj) {
          delete obj[removeKey];
        }
      }
    }

    newArr.push({ ...obj });
  }

  return newArr;
}

module.exports = transformStateWithClones;
