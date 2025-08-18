'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let obj = { ...state };
  const arr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      obj = { ...obj, ...action.extraData };
      arr.push({ ...obj });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete obj[key];
      }
      arr.push({ ...obj });
    }

    if (action.type === 'clear') {
      obj = {};
      arr.push({ ...obj });
    }
  }

  return obj;
}

module.exports = transformStateWithClones;
