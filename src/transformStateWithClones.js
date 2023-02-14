'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let state2 = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(state2, obj['extraData']);
        break;

      case 'removeProperties':
        for (const value of obj.keysToRemove) {
          if (state2[value]) {
            delete state2[value];
          }
        }
        break;

      case `clear`:
        state2 = {};
        break;
    }
    arr.push({ ...state2 });
  }

  return arr;
}

module.exports = transformStateWithClones;
