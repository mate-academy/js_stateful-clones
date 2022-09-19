'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let changingState = { ...state };
  const statuses = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete changingState[keys];
        }

        break;

      case 'clear':
        changingState = {};

        break;

      case 'addProperties':
        Object.assign(changingState, action.extraData);

        break;

      default:
        return changingState;
    }
    statuses.push({ ...changingState });
  }

  return statuses;
}

module.exports = transformStateWithClones;
