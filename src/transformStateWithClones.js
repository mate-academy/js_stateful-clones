'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let cloneObj = { ...state };

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        cloneObj = {
          ...cloneObj, ...action.extraData,
        };
        result.push({ ...cloneObj });
        break;

      case action.type === 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete cloneObj[keys];
        }
        result.push({ ...cloneObj });
        break;

      default:
        Object.keys(cloneObj).forEach(n => delete cloneObj[n]);
        result.push({ ...cloneObj });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
