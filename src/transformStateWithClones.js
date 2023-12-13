'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const arrResolt = [];

  let counter = 0;

  for (const action of actions) {
    const { type, extraData = undefined, keysToRemove = undefined } = action;

    if (arrResolt.length === 0) {
      arrResolt.push({ ...state });
    } else {
      arrResolt.push({ ...arrResolt[counter - 1] });
    }

    switch (type) {
      case 'addProperties':
        Object.assign(arrResolt[counter], extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete arrResolt[counter][key];
        }
        break;
      case 'clear':
        for (const key in arrResolt[counter]) {
          delete arrResolt[counter][key];
        }
        break;
    }
    counter += 1;
  }

  return arrResolt;
}

module.exports = transformStateWithClones;
