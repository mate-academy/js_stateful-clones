'use strict';

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(newState, action.extraData);
        stateHistory.push(structuredClone(newState));
        break;
      }

      case 'removeProperties': {
        if (Array.isArray(action.keysToRemove)) {
          for (const keyToRemove of action.keysToRemove) {
            delete newState[keyToRemove];
          }
          stateHistory.push(structuredClone(newState));
          break;
        } else {
          continue;
        }
      }

      case 'clear': {
        newState = {};
        stateHistory.push(structuredClone(newState));
        break;
      }
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
