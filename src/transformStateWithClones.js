'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arr = [];
  let b;

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      b = Object.assign({}, newState);
      arr.push(b);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key in newState) {
        if (actions[i].keysToRemove.includes(key)) {
          delete newState[key];
        }
      }
      b = Object.assign({}, newState);
      arr.push(b);
    }

    if (actions[i].type === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
      b = Object.assign({}, newState);
      arr.push(b);
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
