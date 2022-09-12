'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const current = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'clear':
        for (const key in current) {
          delete current[key];
        }
        break;

      case 'addProperties':
        for (const key in actions[i].extraData) {
          current[key] = actions[i].extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete current[key];
        }
    }
    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;
