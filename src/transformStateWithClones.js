'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete cloneState[item];
        }
        break;

      case 'clear':
        for (const item in cloneState) {
          delete cloneState[item];
        }
        break;

      default :
        break;
    }

    resultArr.push({ ...cloneState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
