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
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(temp, extraData);
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete temp[key];
      }
    }

    if (type === 'clear') {
      for (const key in temp) {
        delete temp[key];
      }
    }

    newArray.push({ ...temp });
  }

  return newArray;
}

module.exports = transformStateWithClones;
