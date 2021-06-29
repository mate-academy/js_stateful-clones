'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const res = [];
  const copyObj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(copyObj, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete copyObj[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in copyObj) {
        delete copyObj[key];
      }
    }
    res.push({ ...copyObj });
  }

  return res;
}

module.exports = transformStateWithClones;
