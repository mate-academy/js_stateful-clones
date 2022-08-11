'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];

  const obj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        resultArr.push({ ...obj });
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete obj[remove];
        }
        resultArr.push({ ...obj });
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        resultArr.push({ ...obj });
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
