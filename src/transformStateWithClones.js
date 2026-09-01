'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrOfTransformedState = [];
  let currentState = { ...state };

  for (const act of actions) {
    if (act.type === 'clear') {
      currentState = {};
    } else if (act.type === 'addProperties') {
      currentState = { ...currentState, ...act.extraData };
    } else if (act.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of act.keysToRemove) {
        delete currentState[key];
      }
    }
    arrOfTransformedState.push(currentState);
  }

  return arrOfTransformedState;
}

module.exports = transformStateWithClones;
