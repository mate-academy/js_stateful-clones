'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copyState = { ...state };
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        copyState = {
          ...copyState,
          ...action.extraData,
        };

        resultArr.push({
          ...copyState,
          ...action.extraData,
        });
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        resultArr.push({ ...copyState });
        break;

      case 'clear' :
        for (const key in copyState) {
          delete copyState[key];
        }
        resultArr.push({ ...copyState });
        break;

      default :
        break;
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
