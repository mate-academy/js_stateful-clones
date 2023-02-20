'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newObj = { ...state };
  const resArr = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(newObj, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach(key => {
          delete newObj[key];
        });
        break;

      case 'clear' :
        Object.keys(newObj).forEach(key => {
          delete newObj[key];
        });
        break;
    }

    resArr.push({ ...newObj });
  }

  return resArr;
}

module.exports = transformStateWithClones;
