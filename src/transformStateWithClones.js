'use strict';

const ActionType = {
  ADD_PROPERTIES: 'addProperties',
  REMOVE_PROPERTIES: 'removeProperties',
  CLEAR: 'clear',
};

/**
 * @param {Object} state
 * @param {Object[]} actions
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const resultStates = [];

  for (const action of actions) {
    switch (action.type) {
      case ActionType.ADD_PROPERTIES: {
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;
      }

      case ActionType.REMOVE_PROPERTIES: {
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      }

      case ActionType.CLEAR: {
        currentState = {};
        break;
      }

      default:
        // eslint-disable-next-line no-console
        console.error('Unknown action');
    }

    resultStates.push({ ...currentState });
  }

  return resultStates;
}

module.exports = transformStateWithClones;
