'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resArr = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          cloneState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;
      case 'clear':
        for (const key in cloneState) {
          delete cloneState[key];
        }
        break;
      default :
        return 'there was an error';
    }

    resArr.push({ ...cloneState });
  }

  return resArr;
}

module.exports = transformStateWithClones;
