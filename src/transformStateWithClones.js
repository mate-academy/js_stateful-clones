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

  for (const elem of actions) {
    switch (elem.type) {
      case 'addProperties':
        Object.assign(copy, elem.extraData);
        break;

      case 'removeProperties':
        for (const key in copy) {
          for (const elem1 of elem.keysToRemove) {
            if (key === elem1) {
              delete copy[key];
            }
          }
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
    }
    arr.push({ ...copy });
  }

  return arr;
}

module.exports = transformStateWithClones;
