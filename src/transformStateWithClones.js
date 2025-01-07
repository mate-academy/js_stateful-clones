'use strict';

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const states = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    states.push({ ...currentState });
  });

  return states;
}

module.exports = transformStateWithClones;
