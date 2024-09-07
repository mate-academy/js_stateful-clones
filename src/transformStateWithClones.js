'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];

  let currentState = { ...state };

  actions.forEach((action) => {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    resultStates.push(newState);
    currentState = newState;
  });

  return resultStates;
}

module.exports = transformStateWithClones;
