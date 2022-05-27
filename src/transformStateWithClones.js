'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentObj = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        currentObj[key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const key in actions[i].keysToRemove) {
        delete currentObj[actions[i].keysToRemove[key]];
      }
    }

    if (actions[i].type === 'clear') {
      currentObj = {};
    }

    result[i] = currentObj;
    currentObj = { ...result[i] };
  }

  return result;
}

module.exports = transformStateWithClones;
