'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let inp = { ...state };
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(inp, obj.extraData);
        break;

      case 'removeProperties':
        for (const ch of obj.keysToRemove) {
          delete inp[ch];
        }
        break;

      default:
        inp = {};
    }

    result.push({ ...inp });
  }

  return result;
}

module.exports = transformStateWithClones;
