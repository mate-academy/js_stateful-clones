'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = Object.assign({}, state);
  const objArr = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        copy[key] = actions[i].extraData[key];
      }
      objArr.push(Object.assign({}, copy));
    } else if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        if (key in copy) {
          delete copy[key];
        }
      }
      objArr.push(Object.assign({}, copy));
    } else if (actions[i].type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
      objArr.push(Object.assign({}, copy));
    }
  }

  return objArr;
}

module.exports = transformStateWithClones;
