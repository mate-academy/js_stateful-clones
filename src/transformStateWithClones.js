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
        for (const y of key.keysToRemove) {
          delete copy[y];
        }
        break;

      case 'clear':
        for (const part in copy) {
          delete copy[part];
        }
        break;
    }
    arr.push({ ...copy });
  }

  return arr;
}

module.exports = transformStateWithClones;
