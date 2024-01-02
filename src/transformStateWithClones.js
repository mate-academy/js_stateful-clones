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
    if (action.type === 'addProperties') {
      Object.entries(action.extraData).forEach(([key, value]) => {
        objToAddInArrResult[key] = value;
      });
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => delete objToAddInArrResult[key]);
    } else {
      objToAddInArrResult = {};
    }
    result.push({ ...objToAddInArrResult });
  }

  return result;
}

module.exports = transformStateWithClones;
