'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const finalArray = [];
  const newObj = { ...state };

  for (const i of actions) {
    if (i.type === 'addProperties') {
      for (const [key, value] of Object.entries(i.extraData)) {
        newObj[key] = value;
      }
    }

    if (i.type === 'removeProperties') {
      for (const n of i.keysToRemove) {
        delete newObj[n];
      }
    }

    if (i.type === 'clear') {
      for (const key of Object.keys(newObj)) {
        delete newObj[key];
      }
    }
    finalArray.push({ ...newObj });
  }

  return finalArray;
}

module.exports = transformStateWithClones;
