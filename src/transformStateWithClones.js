'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultArray = [];
  const obj = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(obj, key.extraData);
        break;

      case 'removeProperties':
        for (const keys of key.keysToRemove) {
          delete obj[keys];
        }
        break;

      case 'clear':
        for (const row in obj) {
          delete obj[row];
        }
    }

    resultArray.push({ ...obj });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
