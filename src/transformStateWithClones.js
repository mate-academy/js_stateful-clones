'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const item of actions) {
    if (item.type === 'addProperties') {
      const { extraData } = item;

      Object.assign(clone, extraData);
    } else if (item.type === 'removeProperties') {
      const { keysToRemove } = item;

      for (const key in clone) {
        if (keysToRemove.includes(key)) {
          delete clone[key];
        }
      }
    } else if (item.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
