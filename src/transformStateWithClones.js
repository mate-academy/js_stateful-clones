'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionResults = [];
  let copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          copyState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key in action.keysToRemove) {
          delete copyState[action.keysToRemove[key]];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw new Error('Incorrect action type');
    }
    actionResults.push({ ...copyState });
  }

  return actionResults;
}

module.exports = transformStateWithClones;
