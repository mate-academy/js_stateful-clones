'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let clone = { ...state };

  for (const act of actions) {
    if (act.type === 'addProperties') {
      clone = { ...clone, ...act.extraData };
      res.push({ ...clone });
    }

    if (act.type === 'removeProperties') {
      clone = { ...clone };

      for (const key of act.keysToRemove) {
        delete clone[key];
      }
      res.push({ ...clone });
    }

    if (act.type === 'clear') {
      clone = {};
      res.push({ ...clone });
    }
  }

  return res;
}

module.exports = transformStateWithClones;
