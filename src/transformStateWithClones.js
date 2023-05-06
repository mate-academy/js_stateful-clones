'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const objectToEqual = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(objectToEqual, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach((keyToRemove) =>
          delete objectToEqual[keyToRemove]);
        break;

      case 'clear':
        for (const key in objectToEqual) {
          delete objectToEqual[key];
        }
        break;

      default: return;
    }

    const copy = { ...objectToEqual };

    arr.push(copy);
  }

  return arr;
}

module.exports = transformStateWithClones;
