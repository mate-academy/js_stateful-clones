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
    switch (key.type) {
      case 'addProperties':
        Object.assign(stateCopy, key.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of key.keysToRemove) {
          delete stateCopy[removeKey];
        }
        break;

      case 'clear':
        for (const deleteKey in stateCopy) {
          delete stateCopy[deleteKey];
        }
        break;
    }

    arr.push({ ...stateCopy });
  }

  return arr;
}

module.exports = transformStateWithClones;
