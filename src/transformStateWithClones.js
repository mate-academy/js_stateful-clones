'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];

  let currentState = { ...state };

  actions.forEach((action) => {

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        });
        break;

      default:
        break;
    }
    statesArray.push(newState);

    currentState = newState;
  });

  return statesArray;
}

module.exports = transformStateWithClones;
