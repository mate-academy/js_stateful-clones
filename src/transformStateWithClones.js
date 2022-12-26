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

  for (const action of actions) {
    const { extraData, keysToRemove, type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(obj, extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete obj[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
    }

    arrObj.push({ ...obj });
  }

  return arrObj;
}

module.exports = transformStateWithClones;
