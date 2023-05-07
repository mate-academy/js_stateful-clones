'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let objectToEqual = { ...state };

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
        objectToEqual = {};
        break;

      default: return;
    }

    const copy = { ...objectToEqual };

    arr.push(copy);
  }

  return arr;
}

module.exports = transformStateWithClones;
