'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObject = { ...state };
  const resultArr = [];

  for (const item of actions) {
    if (item.type === 'clear') {
      for (const key in resultObject) {
        delete resultObject[key];
      }
      resultArr.push({ ...resultObject });
    }

    if (item.type === 'addProperties') {
      Object.assign(resultObject, item.extraData);
      resultArr.push({ ...resultObject });
    }

    if (item.type === 'removeProperties') {
      for (const char of item.keysToRemove) {
        delete resultObject[char];
      }
      resultArr.push({ ...resultObject });
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
