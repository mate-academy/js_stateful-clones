'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStateConditions = [];
  const state2 = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(state2, actions[i].extraData);
        break;
      case 'removeProperties':
        for (let k = 0; k < actions[i].keysToRemove.length; k++) {
          delete state2[actions[i].keysToRemove[k]];
        }
        break;
      case 'clear':
        for (const key in state2) {
          delete state2[key];
        }
        break;
    }
    allStateConditions.push({ ...state2 });
  }

  return allStateConditions;
}

module.exports = transformStateWithClones;
