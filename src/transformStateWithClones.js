'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove;
      const newState = {};

      for (const [key, value] of Object.entries(currentState)) {
        if (!keysToRemove.includes(key)) {
          newState[key] = value;
        }
      }
      currentState = newState;
    } else if (action.type === 'clear') {
      currentState = {};
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
