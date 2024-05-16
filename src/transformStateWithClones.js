'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const array = [];
  const copy = { ...state };

  for (const x of actions) {
    switch (x.type) {
      case 'addProperties':
        Object.assign(copy, x.extraData);

        break;

      case 'removeProperties':
        for (const y of x.keysToRemove) {
          if (copy[y]) {
            delete copy[y];
          }
        }

        break;

      case 'clear':
        for (const y in copy) {
          delete copy[y];
        }

        break;
    }
    array.push({ ...copy });
  }

  return array;
}

module.exports = transformStateWithClones;
