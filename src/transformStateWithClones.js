'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const newState = {};

      for (const key in currentState) {
        if (!action.keysToRemove.includes(key)) {
          newState[key] = currentState[key];
        }
      }
      currentState = newState;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
