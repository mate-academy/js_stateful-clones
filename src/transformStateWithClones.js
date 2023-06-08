'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clonedState = Object.assign({}, state);

  const actionHandlers = {
    addProperties: (action) => {
      clonedState = Object.assign({}, clonedState, action.extraData);
      result.push(clonedState);
    },
    removeProperties: (action) => {
      const keysToRemove = action.keysToRemove;
      const nextState = Object.assign({}, clonedState);

      for (const key of keysToRemove) {
        if (nextState.hasOwnProperty(key)) {
          delete nextState[key];
        }
      }

      clonedState = nextState;
      result.push(clonedState);
    },
    clear: () => {
      clonedState = {};
      result.push(clonedState);
    },
  };

  for (const action of actions) {
    const actionHandler = actionHandlers[action.type];

    if (actionHandler) {
      actionHandler(action);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
