'use strict';

function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          action.extraData !== null
        ) {
          newState = { ...newState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          newState = { ...newState };

          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }
        break;

      default:
        break;
    }
    states.push({ ...newState });
  }

  return states;
}

module.exports = transformStateWithClones;
