'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = Object.assign({}, state);
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete currentState[keyRemove];
        }
        states.push(Object.assign({}, currentState));
        break;

      case 'addProperties':
        Object.assign(currentState, action.extraData);

        states.push(Object.assign({}, currentState));
        break;

      case 'clear':
        currentState = {};
        states.push(Object.assign({}, currentState));
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
