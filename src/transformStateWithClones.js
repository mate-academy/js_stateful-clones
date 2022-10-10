'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const copyMainArray = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copyMainArray, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyMainArray[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in copyMainArray) {
        delete copyMainArray[key];
      }
    }
    resultArr.push({ ...copyMainArray });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
