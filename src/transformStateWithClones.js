'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const states = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      newState = {};
    }

    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const tempState = { ...newState };

      for (const key of action.keysToRemove) {
        delete tempState[key];
      }
      newState = tempState;
    }

    states.push({ ...newState });
  }

  return states;
}

module.exports = transformStateWithClones;
