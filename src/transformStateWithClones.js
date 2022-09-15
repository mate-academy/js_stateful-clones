'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const resultArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        Object.keys(copyState).forEach(key => delete copyState[key]);
        break;
      default:
        return 'Error';
    }
    resultArr.push({ ...copyState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
