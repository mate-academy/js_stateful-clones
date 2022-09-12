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

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(copy, act.extraData);
        break;
      case 'removeProperties':
        for (const key of act.keysToRemove) {
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
