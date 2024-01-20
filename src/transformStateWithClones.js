'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let objToAddInArrResult = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.entries(action.extraData).forEach(([key, value]) => {
          objToAddInArrResult[key] = value;
        });
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete objToAddInArrResult[key]);
        break;
      default:
        objToAddInArrResult = {};
        break;
    }
    result.push({ ...objToAddInArrResult });
  }

  return result;
}

module.exports = transformStateWithClones;
