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

  for (const key in actions) {
    if (actions[key].type === 'addProperties') {
      Object.assign(copy, actions[key].extraData);
    }

    if (actions[key].type === 'removeProperties') {
      for (const keys of actions[key].keysToRemove) {
        delete copy[keys];
      }
    }

    if (actions[key].type === 'clear') {
      for (const del in copy) {
        delete copy[del];
      }
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
