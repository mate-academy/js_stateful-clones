'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj = { ...state };
  const result = [];

  for (const action of actions) {
    const { extraData, keysToRemove, type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newObj, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        newObj = {};
        break;

      default:
        return 'Error';
    }

    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;
