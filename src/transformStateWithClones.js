'use strict';

function transformStateWithClones(state, actions) {
  const cloneStates = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        Object.keys(currentState).forEach((key) => {
          delete currentState[key];
        });
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      default:
        throw new Error(`Invalid action type`);
    }

    cloneStates.push({ ...currentState });
  }

  return cloneStates;
}

module.exports = transformStateWithClones;
