'use strict';
/* eslint-disable */

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const newArr = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;

      default:
        break;
    }

    newArr.push(Object.assign({}, stateCopy));
  }


  return newArr;
}

module.exports = transformStateWithClones;
