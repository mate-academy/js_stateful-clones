'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, transforms) {
  const newStates = [];
  let initialClone = { ...state };

  for (const transform of transforms) {
    switch (transform.type) {
      case 'addProperties':
        Object.assign(initialClone, transform.extraData);
        break;

      case 'removeProperties':
        for (const key of transform.keysToRemove) {
          delete initialClone[key];
        }

        break;

      case 'clear':
        initialClone = {};
        break;
    }

    newStates.push({ ...initialClone });
  }

  return newStates;
}
module.exports = transformStateWithClones;
