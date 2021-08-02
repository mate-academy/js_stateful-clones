'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  let newState = { ...state };

  for (const key of actions) {
    if (key.type === 'addProperties') {
      for (const keyObj in key.extraData) {
        newState[keyObj] = key.extraData[keyObj];
      }
    }

    if (key.type === 'removeProperties') {
      for (const keyArr of key.keysToRemove) {
        if (newState.hasOwnProperty(keyArr)) {
          delete newState[keyArr];
        }
      }
    }

    if (key.type === 'clear') {
      newState = {};
    }

    newArr.push({ ...newState });
  }

  return newArr;
}

module.exports = transformStateWithClones;
