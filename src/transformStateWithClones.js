'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const index of actions) {
    switch (index.type) {
      case 'addProperties':
        Object.assign(copy, index.extraData);
        break;

      case 'removeProperties':
        for (const char of index.keysToRemove) {
          delete copy[char];
        }
        break;

      case 'clear':
        for (const char in copy) {
          delete copy[char];
        }
        break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
