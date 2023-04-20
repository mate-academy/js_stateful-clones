'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  const actionHandlers = {
    addProperties: (action) => {
      Object.assign(currentState, action.extraData);
    },
    removeProperties: (action) => {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    },
    clear: () => {
      for (const key in currentState) {
        delete currentState[key];
      }
    },
  };

  for (const action of actions) {
    const actionHandler = actionHandlers[action.type];

    if (!actionHandler) {
      throw new Error(`Invalid action type: ${action.type}`);
    }

    actionHandler(action);
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
