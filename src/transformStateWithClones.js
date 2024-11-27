'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action['type']) {
      case 'addProperties':
        Object.assign(clone, action['extraData']);
        break;

      case 'removeProperties':
        const val = Object.values(action['keysToRemove']);

        val.forEach((element) => {
          delete clone[element];
        });
        break;

      case 'clear':
        for (const keyState in clone) {
          delete clone[keyState];
        }
        break;
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
