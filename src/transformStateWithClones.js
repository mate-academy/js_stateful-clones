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

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(copy, obj['extraData']);
        break;

      case 'removeProperties':
        for (const key of obj['keysToRemove']) {
          delete copy[key];
        }
        break;

      case 'clear':
        for (const name in copy) {
          delete copy[name];
        }
        break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
