'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete stateClone[removeKey];
        }
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      default:
        break;
    }

    stateClones.push({ ...stateClone });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
