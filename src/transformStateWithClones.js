'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        newState[key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete newState[key];
      }
    }

    if (actions[i].type === 'clear') {
      const arrKeys = Object.keys(newState);

      for (const key of arrKeys) {
        delete newState[key];
      }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
