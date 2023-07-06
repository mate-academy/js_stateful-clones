'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const obj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'clear':
        for (const member in obj) {
          delete obj[member];
        }
        break;
      case 'addProperties':
        for (const key in actions[i].extraData) {
          obj[key] = actions[i].extraData[key];
        }
        break;
      case 'removeProperties':
        for (let q = 0; q < actions[i].keysToRemove.length; q++) {
          delete obj[actions[i].keysToRemove[q]];
        }
        break;
      default:
        return result;
    }
    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
