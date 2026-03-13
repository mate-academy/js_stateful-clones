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
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = Object.assign({}, currentState, action.extraData);
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
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
