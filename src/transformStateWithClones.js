'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArr = [];
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
      for (const deleteKey in state) {
        delete stateCopy[deleteKey];
      }
    }

    stateArr.push({ ...stateCopy });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
