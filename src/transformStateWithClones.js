'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = {
    ...state,
  };
  const result = [];

  for (const action in actions) {
    switch (actions[action].type) {
      case 'addProperties':
        for (const key in actions[action].extraData) {
          copy[key] = actions[action].extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of actions[action].keysToRemove) {
          delete copy[key];
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
