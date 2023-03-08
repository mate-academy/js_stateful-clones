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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...actions[i].extraData,
        };
        break;

      case 'removeProperties':
        const keysToRemove = actions[i].keysToRemove;
        const { ...newState } = currentState;

        keysToRemove.forEach(key => delete newState[key]);
        currentState = newState;
        break;

      case 'clear':
        currentState = {};
        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
