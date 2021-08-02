'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resArr = [];
  const tempObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(tempObj, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tempObj[key];
        }
        break;
      case 'clear':
        for (const key in tempObj) {
          delete tempObj[key];
        }
        break;
    }
    resArr.push({ ...tempObj });
  }

  return resArr;
}

module.exports = transformStateWithClones;
