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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);
        break;

      case 'removeProperties':
        for (const char of keysToRemove) {
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
