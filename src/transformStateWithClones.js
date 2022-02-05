'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultArr = [];
  const tempObj = Object.assign({}, state);

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(tempObj, item.extraData);
        break;
      case 'removeProperties':
        for (const iterator of item.keysToRemove) {
          delete tempObj[iterator];
        }
        break;
      case 'clear':
        for (const key in tempObj) {
          delete tempObj[key];
        }
        break;
    }
    resultArr.push({ ...tempObj });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
