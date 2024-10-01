'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const finalState = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      finalState.push(Object.assign({}, newState));
    }

    if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        delete newState[action.keysToRemove[i]];
      }
      finalState.push(Object.assign({}, newState));
    }

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      finalState.push(Object.assign({}, newState));
    }
  }

  return finalState;
}

module.exports = transformStateWithClones;
