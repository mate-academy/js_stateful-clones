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

        history.push(Object.assign({}, currentState));
        break;
      case 'removeProperties':
        const stateCopy = Object.assign({}, currentState);

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        currentState = stateCopy;
        history.push(Object.assign({}, currentState));
        break;

      case 'clear':
        currentState = {};
        history.push(Object.assign({}, currentState));
        break;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
