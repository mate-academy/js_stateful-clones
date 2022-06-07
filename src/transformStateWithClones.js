'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateWithClones = {
    clones: [],
  };
  const stateClone = { ...state };

  for (const types of actions) {
    switch (true) {
      case types.type === 'addProperties':
        for (const addKey in types.extraData) {
          stateClone[`${addKey}`] = types.extraData[`${addKey}`];
        }
        break;

      case types.type === 'removeProperties':
        for (const removeKey of types.keysToRemove) {
          delete stateClone[`${removeKey}`];
        }
        break;

      case types.type === 'clear':
        for (const clearKey in stateClone) {
          delete stateClone[`${clearKey}`];
        }
        break;
      default:
        break;
    }
    stateWithClones['clones'].push({ ...stateClone });
  }

  return stateWithClones.clones;
}

module.exports = transformStateWithClones;
