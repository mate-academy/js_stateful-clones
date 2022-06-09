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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        stateClone = Object.assign(stateClone, extraData);

        break;

      case 'removeProperties':
        for (const removeKey of keysToRemove) {
          delete stateClone[removeKey];
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
