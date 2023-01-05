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
        versionsArray.push({ ...newState });
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        versionsArray.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        versionsArray.push({ ...newState });
        break;

      default:
        return 'Sorry, no types matched';
    }
  }

  return versionsArray;
}

module.exports = transformStateWithClones;
