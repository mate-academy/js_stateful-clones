'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    let nextState = Object.assign({}, currentState);

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete nextState[key];
        });
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        break;
    }

    states.push(nextState);
    currentState = nextState;
  }

  return states;
}

module.exports = transformStateWithClones;
