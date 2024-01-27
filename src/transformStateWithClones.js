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
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (currentState.hasOwnProperty(keyToRemove)) {
            delete currentState[keyToRemove];
          }
        }
        break;

      default:
        continue;
    }

    states.push(Object.assign({}, currentState));
  }

  return states;
}

module.exports = transformStateWithClones;
