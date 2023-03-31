'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(clone, obj.extraData);
        break;

      case 'removeProperties':
        const keys = obj.keysToRemove;

        for (const key of keys) {
          delete clone[key];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
