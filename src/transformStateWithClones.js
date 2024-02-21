'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneObj = { ...state };

  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneObj, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete cloneObj[key];
        }
        break;
      case 'clear':
        for (const key in cloneObj) {
          delete cloneObj[key];
        }
        break;
      default:
        throw new Error('No such type');
    }

    result.push({ ...cloneObj });
  }

  return result;
}

module.exports = transformStateWithClones;
