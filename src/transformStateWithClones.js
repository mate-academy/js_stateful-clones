'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultState = [{ ...state }];
  let count = 0;

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    if (count > 0) {
      Object.assign(resultState[count] = {}, resultState[count - 1]);
    }

    switch (type) {
      case 'addProperties':
        Object.assign(resultState[count], extraData);
        count++;
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete resultState[count][key];
        }
        count++;
        break;

      case 'clear':
        for (const key in resultState[count]) {
          delete resultState[count][key];
        }
        count++;
    }
  }

  return resultState;
}

module.exports = transformStateWithClones;
