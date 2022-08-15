'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        stateClone[key] = actions[i].extraData[key];
      }

      arr.push({ ...stateClone });
    } else if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        if (stateClone[actions[i].keysToRemove[j]]) {
          delete stateClone[actions[i].keysToRemove[j]];
        }
      }

      arr.push({ ...stateClone });
    } else if (actions[i].type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }

      arr.push({ ...stateClone });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
