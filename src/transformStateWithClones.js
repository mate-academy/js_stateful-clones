'use strict';

function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  const history = [];

  for (const action of actions) {
    let nextState = { ...prevState };

    switch (action.type) {
      case 'clear': {
        nextState = {};
        break;
      }

      case 'addProperties': {
        const extra =
          action.extraData && typeof action.extraData === 'object'
            ? action.extraData
            : {};
        nextState = { ...prevState, ...extra };
        break;
      }

      case 'removeProperties': {
        const keys = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];
        nextState = { ...prevState };
        for (const key of keys) {
          delete nextState[key];
        }
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }

    history.push(nextState);
    prevState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
module.exports.transformStateWithClones = transformStateWithClones;
