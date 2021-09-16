'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  for (const action in actions) {
    if (actions[action].type === 'addProperties') {
      Object.assign(copy, actions[action].extraData);
    };

    if (actions[action].type === 'removeProperties') {
      for (let i = 0; i < actions[action].keysToRemove.length; i++) {
        delete copy[actions[action].keysToRemove[i]];
      };
    };

    if (actions[action].type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
