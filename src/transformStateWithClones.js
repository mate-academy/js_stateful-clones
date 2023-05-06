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
  const objectToEqual = {};

  Object.assign(objectToEqual, state);

  for (const action of actions) {
    const whatToDo = action.type;

    switch (whatToDo) {
      case 'addProperties':
        Object.assign(objectToEqual, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((keyToRemove) =>
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
