'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [{ ...state }];

  for (let i = 0; i < actions.length; i++) {

    for (const action of actions) {
      const { type, extraData, keysToRemove } = action;
      const arr = result[i];

      switch (type) {
        case 'addProperties':
          Object.assign(arr, extraData);
          break;

        case 'removeProperties':
          if (keysToRemove.length > 1) {
            for (const key of keysToRemove) {
              delete arr[key];
            }
          } else {
            delete arr[keysToRemove];
          }
          break;

        case 'clear':
          for (const key in arr) {
            delete arr[key];
          }
          break;
      }
      result.push({ ...arr });
    }

    result.shift();

    return result;
  }
}

module.exports = transformStateWithClones;