'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const stateCopy = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(stateCopy, key.extraData);
    }

    if (key.type === 'removeProperties') {
      for (const removeKey of key.keysToRemove) {
        delete stateCopy[removeKey];
      }
    }

    if (key.type === 'clear') {
      for (const deleteKey in stateCopy) {
        delete stateCopy[deleteKey];
      }
    }

    arr.push({ ...stateCopy });
  }

  return arr;
}

module.exports = transformStateWithClones;
