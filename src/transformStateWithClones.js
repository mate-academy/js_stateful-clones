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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete clone[key];
        }
        break;

      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'clear':
        for (const item in clone) {
          delete clone[item];
        }
        break;
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
