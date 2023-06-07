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
          resultArr.push(Object.assign(
            {},
            resultArr[resultArr.length - 1],
            action.extraData));
        }
        break;

      case 'removeProperties':
        let temporaryResult = {};

        if (resultArr.length === 0) {
          temporaryResult = { ...state };
        } else {
          temporaryResult = { ...resultArr[resultArr.length - 1] };
        }

        if (action.keysToRemove !== 0) {
          for (const key of action.keysToRemove) {
            delete temporaryResult[key];
          }
        } else {
          temporaryResult = { ...state };
        }

        resultArr.push(temporaryResult);
        break;

      case 'clear':
        resultArr.push({});
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
