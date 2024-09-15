'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  const newArray = [];

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
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }
        break;

      default:
        return 'Error';
    }

    newArray.push({ ...copyState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
