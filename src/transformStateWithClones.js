'use strict';

function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        currentState = Object.keys(currentState).reduce((acc, key) => {
          if (!action.keysToRemove.includes(key)) {
            acc[key] = currentState[key];
          }

          return acc;
        }, {});
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
