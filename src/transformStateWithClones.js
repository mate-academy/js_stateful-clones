'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      currentState = { ...currentState, ...extraData };
    } else if (type === 'removeProperties') {
      currentState = { ...currentState };

      keysToRemove.forEach((key) => {
        delete currentState[key];
      });
    } else if (type === 'clear') {
      currentState = {};
    } else {
      throw new Error(`Unknown action type: ${type}`);
    }

    newState.push({ ...currentState });
  });

  return newState;
}

module.exports = transformStateWithClones;
