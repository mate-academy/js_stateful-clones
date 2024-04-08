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
        currentState = {};
        break;

      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        });
        break;

      default:
        break;
    }
    statesArray.push({ ...currentState })
  });

  return statesArray;
}

module.exports = transformStateWithClones;
