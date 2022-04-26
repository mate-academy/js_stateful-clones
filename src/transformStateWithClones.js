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
    if (obj.type === 'addProperties') {
      Object.assign(inp, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const el in inp) {
        for (const ch of obj.keysToRemove) {
          if (el === ch) {
            delete inp[el];
          }
        }
      }
    }

    if (obj.type === 'clear') {
      inp = {};
    }

    result.push({ ...inp });
  }

  return result;
}

module.exports = transformStateWithClones;
