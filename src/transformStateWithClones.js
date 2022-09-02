'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayWithCopies = [];

  for (const object of actions) {
    const copy = { ...state };

    switch (object.type) {
      case 'addProperties':
        Object.assign(copy, object.extraData);

        arrayWithCopies.push(copy);
        break;

      case 'removeProperties':
        for (const values of object.keysToRemove) {
          delete copy[values];
        }

        arrayWithCopies.push(copy);
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        arrayWithCopies.push(copy);
    }
  }

  return arrayWithCopies;
}

module.exports = transformStateWithClones;
