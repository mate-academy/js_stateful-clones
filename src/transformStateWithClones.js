'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let initialState = Object.assign({}, state);
  const allState = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(initialState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        delete initialState[action.keysToRemove[i]];
      }
    }

    if (action.type === 'clear') {
      initialState = {};
    }

    allState.push({ ...initialState });
  }

  return allState;
}

module.exports = transformStateWithClones;
