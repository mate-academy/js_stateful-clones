'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = { ...state };
  const actionHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(transformedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete transformedState[key];
        }
        break;

      case 'clear':
        for (const item in transformedState) {
          delete transformedState[item];
        }
        break;

      default:
        break;
    }

    actionHistory.push({ ...transformedState });
  }

  return actionHistory;
}

module.exports = transformStateWithClones;
