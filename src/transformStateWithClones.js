'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateWithClones = [];
  let stateClone = { ...state };

  for (const types of actions) {
    switch (types.type) {
      case 'addProperties':
        stateClone = Object.assign(stateClone, types.extraData);

        break;

      case 'removeProperties':
        for (const removeKey of types.keysToRemove) {
          delete stateClone[`${removeKey}`];
        }
        break;

      case 'clear':
        stateClone = {};
        break;
      default:
        break;
    }
    stateWithClones.push({ ...stateClone });
  }

  return stateWithClones;
}

module.exports = transformStateWithClones;
