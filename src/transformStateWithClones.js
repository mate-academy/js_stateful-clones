'use strict';

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    let clonedState;

    switch (action.type) {
      case 'clear':
        clonedState = { ...{} };
        break;

      case 'addProperties':
        clonedState = { ...currentState };

        if (action.extraData) {
          Object.assign(clonedState, action.extraData);
        }
        break;

      case 'removeProperties':
        clonedState = { ...currentState };

        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete clonedState[key];
          }
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push(clonedState);
    currentState = clonedState;
  }

  return result;
}

module.exports = transformStateWithClones;
