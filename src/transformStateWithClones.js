'use strict';

const transformStateWithClones = (state, actions) => {
  let currentState = { ...state };
  const statesHistory = [];

  actions.forEach((action) => {
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
        currentState = {
          ...currentState,
        };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    statesHistory.push({ ...currentState });
  });

  return statesHistory;
};

module.exports = transformStateWithClones;
