'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];

  for (const a of actions) {
    if (a.type === 'addProperties') {
      if (resultArr.length === 0) {
        resultArr.push(Object.assign({}, state, a.extraData));
      } else {
        resultArr.push(Object.assign(
          {},
          resultArr[resultArr.length - 1],
          a.extraData));
      }
    } else if (a.type === 'removeProperties') {
      let temporaryResult = {};

      if (resultArr.length === 0) {
        temporaryResult = { ...state };
      } else {
        temporaryResult = { ...resultArr[resultArr.length - 1] };
      }

      if (a.keysToRemove !== 0) {
        for (const b of a.keysToRemove) {
          delete temporaryResult[b];
        }
      } else {
        temporaryResult = { ...state };
      }

      resultArr.push(temporaryResult);
    } else {
      resultArr.push({});
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
