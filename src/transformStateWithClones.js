'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  let newObject = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(newObject, key.extraData);
    } else if (key.type === 'removeProperties') {
      for (const deleteKey of key.keysToRemove) {
        delete newObject[deleteKey];
      }
    } else if (key.type === 'clear') {
      newObject = {};
    }

    newArray.push({ ...newObject });
  }

  return newArray;
}

module.exports = transformStateWithClones;
