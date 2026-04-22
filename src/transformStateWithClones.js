'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const allStates = [];

  for (const i in actions) {
    switch (actions[i].type) {
      case 'addProperties': {
        Object.assign(stateClone, actions[i].extraData);
        break;
      }

      case 'removeProperties': {
        for (const key in actions[i].keysToRemove) {
          delete stateClone[actions[i].keysToRemove[key]];
        }
        break;
      }

      case 'clear': {
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      }

      default: {
        break;
      }
    }
    allStates.push({ ...stateClone });
  }

  return allStates;
}

module.exports = transformStateWithClones;
