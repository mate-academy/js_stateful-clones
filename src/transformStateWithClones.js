'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const prevState = { ...state };
  const nextActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(prevState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete prevState[key];
        }
        break;

      case 'clear':
        for (const key in prevState) {
          delete prevState[key];
        }
        break;

      default:
        throw Error('unknown action type');
    }

    nextActions.push({ ...prevState });
  }

  return nextActions;
}

module.exports = transformStateWithClones;
