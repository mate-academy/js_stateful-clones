'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const objToPushArr = { ...state };

  for (const obj of actions) {
    if (obj['type'] === 'clear') {
      for (const key in objToPushArr) {
        delete objToPushArr[key];
      }
      arr.push(objToPushArr);
    } else if (obj['type'] === 'addProperties') {
      Object.assign(objToPushArr, obj.extraData);
      arr.push(objToPushArr);
    } else if (obj['type'] === 'removeProperties') {
      for (const key of obj['keysToRemove']) {
        if (key in objToPushArr) {
          delete objToPushArr[key];
        }
      }
      arr.push(objToPushArr);
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
