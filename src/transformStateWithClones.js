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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        resultArray.push(Object.assign({}, resultObject, action.extraData));
        Object.assign(resultObject, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          if (resultObject.hasOwnProperty(key)) {
            delete resultObject[key];
          }
        }
        resultArray.push({ ...resultObject });
        break;
      }

      case 'clear': {
        resultArray.push({});
        resultObject = {};
        break;
      }
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
