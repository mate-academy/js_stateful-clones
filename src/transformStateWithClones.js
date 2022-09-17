'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const arr = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(obj, act.extraData);
        break;

      case 'removeProperties':
        for (const res of act.keysToRemove) {
          delete obj[res];
        }
        break;

      case 'clear':
        for (const clea in obj) {
          delete obj[clea];
        }
        break;
    }

    arr.push({ ...obj });
  }

  return arr;
}

module.exports = transformStateWithClones;
