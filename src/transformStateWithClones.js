'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const arr = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;

      default:
        return ('Data error');
    }
    arr.push({ ...copy });
  }

  return (arr);
}

module.exports = transformStateWithClones;
