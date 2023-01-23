'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const aState = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties' :

        Object.assign(aState, key.extraData);

        break;

      case 'removeProperties' :

        for (const removeKey of key.keysToRemove) {
          delete aState[removeKey];
        }

        break;

      case 'clear' :
        for (const stateKey in aState) {
          delete aState[stateKey];
        }

        break;
    }
    arr.push({ ...aState });
  }

  return arr;
}

module.exports = transformStateWithClones;
