'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const current = { ...state };
  const result = [];

  for (const action of actions) {
    const { extraData, keysToRemove, type } = action;

    switch (type) {
      case 'clear':
        for (const key in current) {
          delete current[key];
        }
        break;

      case 'addProperties':
        Object.assign(current, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete current[key];
        }
        break;

      default:
        throw Error('unknown action type');
    }
    result.push({ ...current });
  }

  return result;
}

module.exports = transformStateWithClones;
