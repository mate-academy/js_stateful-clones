'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const clone = { ...state };

  for (const { type, extraData, keysToRemove } of actions) {
    if (type === 'addProperties') {
      Object.assign(clone, extraData);
      clones.push({ ...clone });
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        if (key in clone) {
          delete clone[key];
        }
      }
      clones.push({ ...clone });
    }

    if (type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
      clones.push({ ...clone });
    }
  }

  return clones;
}

module.exports = transformStateWithClones;
