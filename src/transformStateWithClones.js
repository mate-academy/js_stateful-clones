'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (resultArr.length === 0) {
          resultArr.push(Object.assign({}, state, action.extraData));
        } else {
          resultArr.push(
            Object.assign({}, resultArr[resultArr.length - 1], action.extraData)
          );
        }

        break;
      case 'removeProperties':
        if (resultArr.length === 0) {
          resultArr.push(Object.assign({}, state));
        } else {
          resultArr.push(Object.assign({}, resultArr[resultArr.length - 1]));
        }

        for (const del of action.keysToRemove) {
          delete resultArr[resultArr.length - 1][del];
        }
        break;
      case 'clear':
        resultArr.push({});
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
