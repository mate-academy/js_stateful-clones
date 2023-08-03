'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionHandlers = {
    addProperties: (action, currentState) => {
      const { extraData } = action;

      return {
        ...currentState, ...extraData,
      };
    },
    removeProperties: (action, currentState) => {
      const { keysToRemove } = action;
      const newState = { ...currentState };

      for (const key of keysToRemove) {
        delete newState[key];
      }

      return newState;
    },
    clear: () => ({}),
  };

  const clonesArray = [];

  for (const action of actions) {
    const handler = actionHandlers[action.type];

    if (handler) {
      const newState = handler(action, state);

      clonesArray.push(JSON.parse(JSON.stringify(newState)));
    }
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
