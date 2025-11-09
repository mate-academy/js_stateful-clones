'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state }; // clone initial state

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        nextState = { ...currentState }; // fallback: keep state unchanged
        break;
    }

    history.push(nextState);
    currentState = nextState; // next action uses this state
  }

  return history;
}

module.exports = transformStateWithClones;
