'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArray = [];
  const temp = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const addKeys = action.extraData;

      Object.assign(temp, addKeys);
    }

    if (action.type === 'removeProperties') {
      const array = action['keysToRemove'];

      for (const arr of array) {
        if (Object.keys(temp).includes(arr)) {
          delete temp[arr];
        }
      }
    }

    if (action.type === 'clear') {
      for (const t in temp) {
        delete temp[t];
      }
    }

    newArray.push({ ...temp });
  }

  return newArray;
}

module.exports = transformStateWithClones;
