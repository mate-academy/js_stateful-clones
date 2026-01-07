'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = Object.assign({}, state);
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const nextState = Object.assign({}, currentState, action.extraData);

        currentState = nextState;

        break;
      case 'removeProperties':
        const stateCopy = Object.assign({}, currentState);

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        currentState = stateCopy;

        break;

      case 'clear':
        currentState = {};

        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(Object.assign({}, currentState));
  }

  return history;
}

module.exports = transformStateWithClones;
