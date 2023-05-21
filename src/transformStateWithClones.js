'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const obj = { ...state };
  const resultArr = [];

  for (const num in actions) {
    const action = actions[num];

    if (action.type === 'addProperties') {
      Object.assign(obj, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete obj[key];
      }
    } else if (action.type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      };
    }

    resultArr.push({ ...obj });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
