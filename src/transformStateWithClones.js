'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const obj = { ...state };

  for (let j = 0; j < actions.length; j++) {
    if (actions[j].type === 'addProperties') {
      Object.assign(obj, actions[j].extraData);
    }

    if (actions[j].type === 'removeProperties') {
      for (const key of actions[j].keysToRemove) {
        delete obj[key];
      }
    }

    if (actions[j].type === 'clear') {
      for (const rty in obj) {
        delete obj[rty];
      }
    }
    res.push({ ...obj });
  }

  return res;
}

module.exports = transformStateWithClones;
