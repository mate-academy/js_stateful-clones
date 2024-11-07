'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
'use strict';

/**
 * Transforms state with clone actions.
 * @param {Object} state - The initial state.
 * @param {Array} actions - Array of actions to apply.
 * @return {Object[]} - Array of cloned states after each action.
 */
function transformStateWithClones(state, actions) {
  const clonedStates = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }
    clonedStates.push({ ...currentState });
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
