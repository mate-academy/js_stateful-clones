'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = { ...state };
  const nextActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw Error('Error');
    }

    nextActions.push({ ...newState });
  }

  return nextActions;
}

module.exports = transformStateWithClones;
