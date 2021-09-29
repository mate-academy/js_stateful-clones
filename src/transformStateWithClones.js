'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = new Array(0);
  const clone = { ...state };

  for (const elem of actions) {
    switch (elem.type) {
      case 'addProperties': {
        Object.assign(clone, elem.extraData);
        break;
      }

      case 'removeProperties': {
        for (const elem1 of elem.keysToRemove) {
          delete clone[elem1];
        }
        break;
      }

      case 'clear': {
        for (const prop in clone) {
          delete clone[prop];
        }
        break;
      }
    }
    array.push({ ...clone });
  }

  return array;
}

module.exports = transformStateWithClones;
