'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const result = [];

  for (const action of actions) {
    const { extraData, keysToRemove, type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const value of keysToRemove) {
          delete clone[value];
        }
        break;
      case 'clear':
        clone = {};
        break;

      default:
        return 'Error';
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
