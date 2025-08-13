'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state }; // clone inicial para não modificar o origin

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        if (key in currentState) {
          delete currentState[key];
        }
      }
    }
    // esta função faz uma cópia profunda (deep clone) do objeto curretState
    history.push(structuredClone(currentState));
  }

  return history;
}

module.exports = transformStateWithClones;
