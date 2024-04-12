'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const newState = { ...state };

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      for (const [key, val] of Object.entries(action.extraData)) {
        newState[key] = val;
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      if (Object.keys(state).length < 1) {
        return {};
      }

      for (const key of Object.keys(newState)) {
        delete newState[key];
      }
    }
    states.push({ ...newState });
  });

  return states;
}

module.exports = transformStateWithClones;
