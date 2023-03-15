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
  const tempObj = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(tempObj, item.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of item.keysToRemove) {
          if (tempObj.hasOwnProperty(keyToRemove)) {
            delete tempObj[keyToRemove];
          }
        }
        break;

      case 'clear':
        for (const prop in tempObj) {
          delete tempObj[prop];
        }
        break;
    }

    resultArr.push({ ...tempObj });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
