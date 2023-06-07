'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let temporaryResult = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(temporaryResult, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete temporaryResult[key];
        }
        break;

      default:
        temporaryResult = {};
    }
    resultArr.push({ ...temporaryResult });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
