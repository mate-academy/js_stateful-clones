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
    switch (act.type) {
      case 'addProperties':
        Object.assign(result, act.extraData);
        break;

      case 'removeProperties':
        for (const del of act.keysToRemove) {
          delete result[del];
        }
        break;

      case 'clear':
        result = {};
    }
    resArray.push({ ...result });
  }

  return resArray;
}

module.exports = transformStateWithClones;
