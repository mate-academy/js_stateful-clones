'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let result = { ...state };
  const resArray = [];

  for (const act of actions) {
    if (act.type === 'addProperties') {
      Object.assign(result, act.extraData);
      resArray.push({ ...result });
      continue;
    }

    if (act.type === 'removeProperties') {
      for (const del of act.keysToRemove) {
        delete result[del];
      }

      resArray.push({ ...result });
      continue;
    }

    result = {};
    resArray.push({ ...result });
  }

  return resArray;
}

module.exports = transformStateWithClones;
