'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const copy = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      for (const key of Object.keys(copy)) {
        delete copy[key];
      }
    }

    if (action.type === 'addProperties') {
      for (const data in action.extraData) {
        copy[data] = action.extraData[data];
      }
    }

    if (action.type === 'removeProperties') {
      for (const data in action.keysToRemove) {
        delete copy[action.keysToRemove[data]];
      }
    }
    resultArr.push({ ...copy });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
