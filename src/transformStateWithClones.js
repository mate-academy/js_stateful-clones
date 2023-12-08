'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const versionsState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          copyState = {
            ...copyState, ...action.extraData,
          };
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const keyToRemove of action.keysToRemove) {
            delete copyState[keyToRemove];
          }
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      default:
        break;
    }
    versionsState.push({ ...copyState });
  }

  return versionsState;
}
module.exports = transformStateWithClones;
