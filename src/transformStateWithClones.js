'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [{ ...state }];

  for (const obj in actions) {
    const { type, extraData, keysToRemove } = actions[obj];
    let count = 0;
    const arr = result[count];

    if (type === 'addProperties') {
      Object.assign(arr, extraData);
    } else if (type === 'removeProperties') {
      if (keysToRemove.length > 1) {
        for (const key of keysToRemove) {
          delete arr[key];
        }
      } else {
        delete arr[keysToRemove];
      }
    } else if (type === 'clear') {
      for (const key in arr) {
        delete arr[key];
      }
    }
    result.push({ ...arr });
    count++;
  }
  result.shift();

  return result;
}

module.exports = transformStateWithClones;
