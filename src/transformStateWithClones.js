'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateActions = [];
  const currentState = { ...state };

  for (const types of actions) {
    if (types.type === 'addProperties') {
      Object.assign(currentState, types['extraData']);

      stateActions.push({ ...currentState });
    }

    if (types.type === 'removeProperties') {
      for (const key of types.keysToRemove) {
        delete currentState[key];
      }

      stateActions.push({ ...currentState });
    }

    if (types.type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }

      stateActions.push({ ...currentState });
    }
  }

  return stateActions;
}

module.exports = transformStateWithClones;
