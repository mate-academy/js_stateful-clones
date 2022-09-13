'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = [];
  let help = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(help, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete help[key];
        }
        break;

      case 'clear':
        help = {};
        break;
      default:
        break;
    }

    clone.push({ ...help });
  }

  return clone;
}

module.exports = transformStateWithClones;
