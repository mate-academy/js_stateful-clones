'use strict';

function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let currentState = { ...initialState };

  actions.forEach((action) => {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
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
        throw new Error(`Невідомий тип дії: ${action.type}`);
    }
    stateHistory.push(newState);
    currentState = newState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
