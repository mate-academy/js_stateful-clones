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
        for (const remove of key.keysToRemove) {
          delete copy[remove];
        }
        break;

      case 'clear':
        for (const name in copy) {
          delete copy[name];
        }
        break;
    }

    arr.push({ ...copy });
  }

  return arr;
}

module.exports = transformStateWithClones;
