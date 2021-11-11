'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const result = [];

  for (const keys of actions) {
    switch (keys.type) {
      case 'addProperties':
        copy = {
          ...copy,
          ...keys.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of keys.keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        copy = {};
        break;
    }
    result.push({ ...copy });
  }

  return result;
  // write code here
}
module.exports = transformStateWithClones;
