'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copiedObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        copiedObj = {};
        break;

      case 'addProperties':
        Object.assign(copiedObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copiedObj[key];
        }
        break;

      default:
        return 'Invalid type data';
    }

    result.push({ ...copiedObj });
  }

  return result;
}

module.exports = transformStateWithClones;
