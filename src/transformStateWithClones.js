'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = state;
  const history = [];

  for (const action of actions) {
    let newState;

    if (action.type === 'clear') {
      newState = {};
    }

    if (action.type === 'addProperties') {
      newState = {
        ...currentState,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      newState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
