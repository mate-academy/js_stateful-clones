'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        return;
    }
    result.push({ ...newState });
  }

  return result;
}
module.exports = transformStateWithClones;
