'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let resultObject = { ...state };
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      resultArray.push(Object.assign({}, resultObject, actions[i].extraData));
      Object.assign(resultObject, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        if (resultObject.hasOwnProperty(key)) {
          delete resultObject[key];
        }
      }
      resultArray.push({ ...resultObject });
    }

    if (actions[i].type === 'clear') {
      resultArray.push({});
      resultObject = {};
    }
  }

  return resultArray;
}
module.exports = transformStateWithClones;
