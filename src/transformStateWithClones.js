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

    const switcher = {
      add: 'addProperties',
      remove: 'removeProperties',
      clear: 'clear',
    };

    switch (type) {
      case switcher.add:
        Object.assign(objectToEqual, extraData);
        break;

      case switcher.remove:
        keysToRemove.forEach((keyToRemove) =>
          delete objectToEqual[keyToRemove]);
        break;

      case switcher.clear:
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
