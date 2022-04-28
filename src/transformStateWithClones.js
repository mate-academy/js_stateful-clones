'use strict';

/**
 * @param {Object} obj
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const obj = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(obj, act.extraData);
        break;

      case 'removeProperties':
        for (const extra of act.keysToRemove) {
          delete obj[extra];
        }
        break;

      case 'clear':
        for (const del in obj) {
          delete obj[del];
        }
        break;
    }
    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
