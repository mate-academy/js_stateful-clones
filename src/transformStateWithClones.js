'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const resultObject = {};

  for (const key in state) {
    resultObject[key] = state[key];
  }

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(resultObject, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete resultObject[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in resultObject) {
        delete resultObject[key];
      }
    }

    resultArray.push({ ...resultObject });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
