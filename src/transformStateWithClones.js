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
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        obj[key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const key in actions[i].keysToRemove) {
        delete obj[actions[i].keysToRemove[key]];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
    }
    result[i] = { ...obj };
  }

  return result;
}

module.exports = transformStateWithClones;
