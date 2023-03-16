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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);
        break;

      case 'removeProperties': {
        for (const key of keysToRemove) {
          delete copy[key];
        }
        break;
      }

      case 'clear':
        for (const value in copy) {
          delete copy[value];
        }
        break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
