'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);

      states.push({ ...currentState });
    }

    if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        delete currentState[property];
      }

      states.push({ ...currentState });
    }

    if (action.type === 'clear') {
      for (const property in currentState) {
        delete currentState[property];
      }

      states.push({ ...currentState });
    }
  }

  return states;
}

module.exports = transformStateWithClones;
