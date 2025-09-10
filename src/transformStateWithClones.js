'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let temporaryState = { ...state };

  for (const action of actions) {
    const newState = { ...temporaryState };

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      // states.push(newState);
    }

    if (action.type === 'removeProperties') {
      for (const keyState of action.keysToRemove) {
        delete newState[keyState];
        // states.push(newState);
      }
    }

    if (action.type === 'clear') {
      for (const keyState in newState) {
        delete newState[keyState];
        // states.push(newState);
      }
    }

    states.push(newState);
    temporaryState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
