'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const stateClone = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(stateClone, key.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of key.keysToRemove) {
          delete stateClone[removeKey];
        }
        break;

      case 'clear':
        for (const kay in stateClone) {
          delete stateClone[kay];
        }
        break;
    }

    array.push(Object.assign({}, stateClone));
  }

  return array;
}

module.exports = transformStateWithClones;
