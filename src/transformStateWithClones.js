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
  const statesAfterActions = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          const { [key]: _, ...rest } = newState;

          newState = rest;
        });
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    statesAfterActions.push({ ...newState });
  });

  return statesAfterActions;
}

module.exports = transformStateWithClones;
