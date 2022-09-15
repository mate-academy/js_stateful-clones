'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const empty = [];

  for (const act of actions) {
    if (act.type === 'addProperties') {
      Object.assign(clone, act.extraData);
    }

    if (act.type === 'removeProperties') {
      for (const key of act.keysToRemove) {
        delete clone[key];
      }
    }

    if (act.type === 'clear') {
      clone = {};
    }
    empty.push({ ...clone });
  }

  return empty;
}

module.exports = transformStateWithClones;
