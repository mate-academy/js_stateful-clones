'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayWithCopies = [];
  const copy = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(copy, object.extraData);
        break;

      case 'removeProperties':
        for (const values of object.keysToRemove) {
          delete copy[values];
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }
    arrayWithCopies.push({ ...copy });
  }

  return arrayWithCopies;
}

module.exports = transformStateWithClones;
