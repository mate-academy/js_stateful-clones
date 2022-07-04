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
  const arrayStates = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties' :
        newState = {
          ...newState,
          ...(action.extraData),
        };

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        newState = {};
    };

    arrayStates.push({ ...newState });
  });

  return arrayStates;
}

module.exports = transformStateWithClones;
