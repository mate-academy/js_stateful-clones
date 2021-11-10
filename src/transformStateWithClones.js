'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObj = Object.assign({}, state);
  const resArr = [];

  for (const prop of actions) {
    const { type, keysToRemove, extraData } = prop;

    switch (type) {
      case 'addProperties':
        Object.assign(newObj, extraData);
        break;

      case 'removeProperties':
        for (const rem of keysToRemove) {
          delete newObj[rem];
        }
        break;

      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
    }
    resArr.push({ ...newObj });
  }

  return resArr;
}

module.exports = transformStateWithClones;
