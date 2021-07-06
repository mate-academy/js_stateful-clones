'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      if (i === 0) {
        resultArray.push({
          ...state,
          ...actions[i].extraData,
        });
      }

      if (i > 0) {
        resultArray.push({
          ...resultArray[i - 1],
          ...actions[i].extraData,
        });
      }
    }

    if (actions[i].type === 'removeProperties') {
      if (i === 0) {
        resultArray.push({
          ...state,
        });
      }

      if (i > 0) {
        resultArray.push({
          ...resultArray[i - 1],
        });
      }

      for (let k = 0; k < actions[i].keysToRemove.length; k++) {
        if (resultArray[i][actions[i].keysToRemove[k]]) {
          delete resultArray[i][actions[i].keysToRemove[k]];
        }
      }
    }

    if (actions[i].type === 'clear') {
      resultArray.push({});
    }
  }

  return resultArray;
}

module.exports = transformStateWithClones;
