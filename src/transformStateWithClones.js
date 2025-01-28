'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copyState = Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        copyState = { ...copyState };

        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;
      case 'clear':
        copyState = {};
        break;
      default:
        copyState = { ...copyState };
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
