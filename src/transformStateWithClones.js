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
    for (const key in actions[i]) {
      switch (actions[i][key]) {
        case 'addProperties':
          Object.assign(resultArr[i], actions[i].extraData);

          if (i < (actions.length - 1)) {
            resultArr.push(Object.assign({}, resultArr[i]));
          }
          break;

        case 'removeProperties':
          for (let propRemove of actions[i].keysToRemove) {
            delete resultArr[i][propRemove];
          }

          if (i < (actions.length - 1)) {
            resultArr.push(Object.assign({}, resultArr[i]));
          }
          break;

        case 'clear':
          for (const propClear in resultArr[i]) {
            delete resultArr[i][propClear];
          }

          if (i < (actions.length - 1)) {
            resultArr.push(Object.assign({}, resultArr[i]));
          }
          break;
      }
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
