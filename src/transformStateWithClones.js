'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arr = [];

  for (const obj of actions) {
    const { type, extraData, keysToRemove } = obj;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        for (const property in clone) {
          delete clone[property];
        }
        break;
    }

    const emptyObj = { ...clone };

    arr.push(emptyObj);
  }

  return arr;
}

module.exports = transformStateWithClones;
