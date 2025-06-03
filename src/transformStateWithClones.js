'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateChangeIteration = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        newState[key] = value;
      }
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        delete newState[key];
      });
    } else if (action.type === 'clear') {
      for (const key of Object.keys(newState)) {
        delete newState[key];
      }
    }
    stateChangeIteration.push({ ...newState });
  });

  return stateChangeIteration;
}

module.exports = transformStateWithClones;
