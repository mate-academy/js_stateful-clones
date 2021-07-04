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

  for (const x in actions) {
    if (actions[x].type === 'addProperties') {
      Object.assign(copy, actions[x].extraData);
    };

    if (actions[x].type === 'removeProperties') {
      for (let i = 0; i < actions[x].keysToRemove.length; i++) {
        delete copy[actions[x].keysToRemove[i]];
      };
    };

    if (actions[x].type === 'clear') {
      for (const j in copy) {
        delete copy[j];
      }
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
