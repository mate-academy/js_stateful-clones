'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let nextState;

    switch (type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...currentState, ...extraData };
        break;
      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of keysToRemove) {
          delete nextState[key];
        }
        break;

      default:
        nextState = currentState;
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
