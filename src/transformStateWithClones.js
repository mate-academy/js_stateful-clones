'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const newActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);

        // newActions.push(newState);

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        // newActions.push(newState);

        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        break;

      default:
        break;
    }

    newActions.push({ ...newState });
  }

  return newActions;
}

module.exports = transformStateWithClones;
