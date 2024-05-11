'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultObject = { ...state };

  const resultArray = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key in resultObject) {
        delete resultObject[key];
      }
    }

    if (action.type === 'addProperties') {
      Object.assign(resultObject, action.extraData);
    }

    if (action.type === 'removeProperties') {
      const keys = action.keysToRemove;

      for (const key of keys) {
        delete resultObject[key];
      }
    }

    resultArray.push({ ...resultObject });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
