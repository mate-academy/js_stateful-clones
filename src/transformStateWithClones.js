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

  const statesHistory = [state];

  for (const action of actions) {
    const prevState = statesHistory.at(-1);
    const newState = actionsObj[action.type](prevState, action);

    statesHistory.push(newState);
  }
  statesHistory.shift();

  return statesHistory;
}

module.exports = transformStateWithClones;
