'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = Object.assign({}, state);
  const result = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(clone, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete clone[key];
        }
        break;

      case `clear`:
        for (const clear in clone) {
          delete clone[clear];
        }
        break;

      default:
        return null;
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
