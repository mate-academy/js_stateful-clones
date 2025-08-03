'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateClone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateClone, actions[i].extraData);
        break;
      case 'removeProperties':
        for (let y = 0; y < actions[i].keysToRemove.length; y++) {
          delete stateClone[actions[i].keysToRemove[y]];
        }
        break;
      default:
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
