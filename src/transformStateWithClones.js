'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];

  resultArr.push(Object.assign({}, state));

  for (let i = 0; i < actions.length; i++) {
    for (const k in actions[i]) {
      if (actions[i][k] === 'addProperties') {
        Object.assign(resultArr[i], actions[i].extraData);

        if (i < (actions.length - 1)) {
          resultArr.push(Object.assign({}, resultArr[i]));
        }
      }

      if (actions[i][k] === 'removeProperties') {
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete resultArr[i][actions[i].keysToRemove[j]];
        }

        if (i < (actions.length - 1)) {
          resultArr.push(Object.assign({}, resultArr[i]));
        }
      }

      if (actions[i][k] === 'clear') {
        for (const l in resultArr[i]) {
          delete resultArr[i][l];
        }

        if (i < (actions.length - 1)) {
          resultArr.push(Object.assign({}, resultArr[i]));
        }
      }
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
