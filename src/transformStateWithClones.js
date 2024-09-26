'use strict';

function transformStateWithClones(initialState, actions) {
  const resultStates = [];
  let currentState = { ...initialState };

  actions.forEach(action => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        currentState = { ...currentState };
        action.keysToRemove.forEach(key => delete currentState[key]);
        break;
      default:
        break;
    }
    resultStates.push({ ...currentState });
  });

  return resultStates;
}

module.exports = transformStateWithClones;
