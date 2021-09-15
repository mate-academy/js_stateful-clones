'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// eslint-disable-next-line no-shadow
function transformStateWithClones(state, actions) {
  const arr = [];
  const obj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(obj, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const c of actions[i].keysToRemove) {
        delete obj[c];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
    }

    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;
