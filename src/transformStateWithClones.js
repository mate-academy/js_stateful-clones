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

  for (const char of actions) {
    if (count > 0) {
      Object.assign(resultState[count] = {}, resultState[count - 1]);
    }

    if (char.type === 'addProperties') {
      Object.assign(resultState[count], char.extraData);
    }

    if (char.type === 'removeProperties') {
      for (const charRemove of char.keysToRemove) {
        for (const key in resultState[count]) {
          if (charRemove === key) {
            delete resultState[count][key];
          }
        }
      }
    }

    if (char.type === 'clear') {
      for (const key in resultState[count]) {
        delete resultState[count][key];
      }
    }

    count++;
  }

  return resultState;
}

module.exports = transformStateWithClones;
