'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // Clon del estado original

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const newState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      currentState = newState;
    }

    result.push({ ...currentState }); // Guardar una copia del estado actual
  }

  return result;
}

module.exports = transformStateWithClones;
