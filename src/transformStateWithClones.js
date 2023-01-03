'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObject = { ...state };
  const newArray = [];

  for (const obj in actions) {
    switch (actions[obj].type) {
      case 'addProperties':
        Object.assign(newObject, actions[obj].extraData);
        newArray.push({ ...newObject });
        break;

      case 'clear':
        for (const i in newObject) {
          delete newObject[i];
        }
        newArray.push({ ...newObject });
        break;

      case 'removeProperties':
        for (const index of actions[obj].keysToRemove) {
          delete newObject[index];
        }
        newArray.push({ ...newObject });
        break;
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;
