'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const resultObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(resultObject, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (resultObject[key]) {
            delete resultObject[key];
          }
        }
        break;

      case 'clear':
        for (const prop in resultObject) {
          delete resultObject[prop];
        }
        break;
    }
    resultArray.push({ ...resultObject });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
