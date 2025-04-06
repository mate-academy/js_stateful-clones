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

  actions.forEach(action => {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        newState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete newState[key];
        });
        break;
      default:
        break;
    }

    currentState = newState;
    resultStates.push(newState);
  });

  return resultStates;
}

module.exports = transformStateWithClones;
