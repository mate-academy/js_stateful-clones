'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          newState[key] = actions[i].extraData[key];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete newState[key];
        }
        break;
      default:
        return 'Something went wrong';
    }

    resultArray.push(newState);
    newState = { ...newState };
  }

  return resultArray;
}
module.exports = transformStateWithClones;
