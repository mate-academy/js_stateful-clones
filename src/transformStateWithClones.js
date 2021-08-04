'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneArray = [];
  const newObject = { ...state };

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(newObject, item.extraData);
        break;

      case 'removeProperties':
        for (const removeItem of item.keysToRemove) {
          delete newObject[removeItem];
        }
        break;

      case 'clear':
        for (const key in newObject) {
          delete newObject[key];
        }
        break;
    }

    cloneArray.push({ ...newObject });
  }

  return cloneArray;
}

module.exports = transformStateWithClones;
