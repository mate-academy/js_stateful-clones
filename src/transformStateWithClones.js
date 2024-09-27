'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const result = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const data in action.extraData) {
        result[data] = action.extraData[data];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete result[key];
      }
    }

    if (action.type === 'clear') {
      Object.keys(result).forEach((key) => delete result[key]);
    }

    resultArray.push({ ...result });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
