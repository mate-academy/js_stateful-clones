'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newObj = Object.assign({}, state);
  const newArray = [];

  for (const item of actions) {
    if (item.type === 'addProperties') {
      Object.assign(newObj, item.extraData);
    }

    if (item.type === 'removeProperties') {
      for (const index of item.keysToRemove) {
        delete newObj[index];
      }
    }

    if (item.type === 'clear') {
      for (const key in newObj) {
        delete newObj[key];
      }
    }

    const FinalObj = { ...newObj };

    newArray.push(FinalObj);
  }

  return newArray;
}

module.exports = transformStateWithClones;
