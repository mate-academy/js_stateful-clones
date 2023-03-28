'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const memory = {
    ...state,
  };
  const out = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          memory[key] = actions[i].extraData[key];
        }
        break;
      case 'removeProperties':
        for (let x = 0; x < actions[i].keysToRemove.length; x++) {
          delete memory[actions[i].keysToRemove[x]];
        }
        break;
      case 'clear':
        for (const key in memory) {
          delete memory[key];
        }
        break;
    }

    out.push({
      ...memory,
    });
  }

  return out;
}

module.exports = transformStateWithClones;
