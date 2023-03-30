'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = {
    ...state,
  };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          stateCopy[key] = actions[i].extraData[key];
        }
        break;
      case 'removeProperties':
        for (let x = 0; x < actions[i].keysToRemove.length; x++) {
          delete stateCopy[actions[i].keysToRemove[x]];
        }
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }

    result.push({
      ...stateCopy,
    });
  }

  return result;
}

module.exports = transformStateWithClones;
