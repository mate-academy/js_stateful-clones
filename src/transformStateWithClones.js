'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const copy = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(copy, key.extraData);
        break;

      case 'removeProperties':
        for (const element of key.keysToRemove) {
          delete copy[element];
        }
        break;

      case 'clear':
        for (const keys in copy) {
          delete copy[keys];
        }
    }

    arr.push({ ...copy });
  }

  return arr;
}

module.exports = transformStateWithClones;
