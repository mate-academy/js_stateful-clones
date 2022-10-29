'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const newObj = { ...state };
  let tempObj = {};

  for (const eachObj of actions) {
    if (eachObj.type === 'addProperties') {
      Object.assign(newObj, eachObj.extraData);
      tempObj = { ...newObj };
      res.push(tempObj);
    }

    if (eachObj.type === 'removeProperties') {
      for (const key of eachObj.keysToRemove) {
        delete newObj[key];
      }
      tempObj = { ...newObj };
      res.push(tempObj);
    }

    if (eachObj.type === 'clear') {
      for (const each of Object.getOwnPropertyNames(newObj)) {
        delete newObj[each];
      }

      tempObj = { ...newObj };
      res.push(tempObj);
    }
  }

  return res;
}

module.exports = transformStateWithClones;
