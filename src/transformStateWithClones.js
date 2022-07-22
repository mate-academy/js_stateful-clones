'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = Object.assign({}, state);
  const resultArr = [];

  for (const key of actions) {
    switch (key.type) {
      case 'removeProperties':
        for (const keyRemove of key.keysToRemove) {
          delete newObj[keyRemove];
        }
        resultArr.push(Object.assign({}, newObj));
        break;

      case 'addProperties':
        Object.assign(newObj, key.extraData);

        resultArr.push(Object.assign({}, newObj));
        break;

      case 'clear':
        newObj = {};
        resultArr.push(Object.assign({}, newObj));
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
