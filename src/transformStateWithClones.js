'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let initialState = { ...state };

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      initialState = { ...initialState, ...extraData };
    } else if (type === 'removeProperties') {
      initialState = { ...initialState };

      keysToRemove.forEach((key) => {
        delete initialState[key];
      });
    } else if (type === 'clear') {
      initialState = {};
    } else {
      throw new Error(`Unknown action type: ${type}`);
    }

    newState.push({ ...initialState });
  });

  return newState;
}

module.exports = transformStateWithClones;
