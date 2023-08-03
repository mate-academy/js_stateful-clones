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
  let previousState = { ...state }; // Змінимо 'currentState' на 'previousState'

  for (const action of actions) {
    const handler = actionHandlers[action.type];

    if (handler) {
      previousState = handler(action, previousState);
      clonesArray.push(JSON.parse(JSON.stringify(previousState)));
    }
  }

  return clonesArray;
}

module.exports = transformStateWithClones;
