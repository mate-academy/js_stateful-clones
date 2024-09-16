'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const ans = [];
  const obj = { ...state };

  for (const value of transforms) {
    if (value.operation === 'addProperties') {
      Object.assign(obj, value.properties);
    } else if (value.operation === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
    } else if (value.operation === 'removeProperties') {
      for (const prop of (value.properties)) {
        delete obj[prop];
      }
    }

    ans.push({ ...obj });
  }

  return ans;
}

module.exports = transformStateWithClones;
