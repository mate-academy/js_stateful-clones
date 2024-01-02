'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let objToAddInArrRes = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.entries(action.extraData).forEach(([key, value]) => {
        objToAddInArrRes[key] = value;
      });
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(key => delete objToAddInArrRes[key]);
    } else {
      objToAddInArrRes = {};
    }
    result.push({ ...objToAddInArrRes });
  }

  return result;
}

module.exports = transformStateWithClones;
