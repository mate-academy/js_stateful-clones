'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const actionsObj = {
    clear: () => ({}),
    addProperties: (currState, action) => ({
      ...currState,
      ...action.extraData,
    }),
    removeProperties: (currState, action) => {
      const newState = { ...currState };

      action.keysToRemove.forEach((keyToRemove) => {
        delete newState[keyToRemove];
      });

      return newState;
    },
  };

  const statesHistory = actions.reduce(
    (states, action) => {
      states.push(actionsObj[action.type](states.at(-1), action));

      return states;
    },
    [state],
  );

  statesHistory.shift();

  return statesHistory;
}

module.exports = transformStateWithClones;
