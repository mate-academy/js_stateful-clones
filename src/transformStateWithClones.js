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
    const { type, extraData, keysToRemove } = actions[i];
    const arr = result[i];

    switch (type) {
      case 'addProperties':
        Object.assign(arr, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete arr[key];
        }
        break;

      case 'clear':
        for (const key in arr) {
          delete arr[key];
        }
        break;
    }

    if (actions.length > i + 1) {
      result[i + 1] = { ...arr };
    }
  }

  return result;
}

module.exports = transformStateWithClones;
