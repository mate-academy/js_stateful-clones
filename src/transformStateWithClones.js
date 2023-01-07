'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const versionsArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        throw new Error('unknown action type');
    }

    versionsArray.push({ ...newState });
  }

  return versionsArray;
}

module.exports = transformStateWithClones;
