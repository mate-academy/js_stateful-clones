'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneObject = { ...state };
  const resultArr = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(cloneObject, obj['extraData']);
        break;
      case 'removeProperties':
        for (const key of obj['keysToRemove']) {
          delete cloneObject[key];
        }
        break;
      case 'clear':
        Object.keys(cloneObject).forEach(key => delete cloneObject[key]);
        break;
    }

    resultArr.push({ ...cloneObject });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
