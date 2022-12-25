'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const arrObj = [];

  for (const key of actions) {
    const { extraData, keysToRemove, type } = key;

    switch (type) {
      case 'addProperties':
        Object.assign(obj, extraData);
        break;

      case 'removeProperties':
        for (const key2 of keysToRemove) {
          delete obj[key2];
        }
        break;

      case 'clear':
        for (const key3 in obj) {
          delete obj[key3];
        }
        break;
    }

    arrObj.push({ ...obj });
  }

  return arrObj;
}

module.exports = transformStateWithClones;
