'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = Object.assign({}, state);
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete currentState[property];
        }
        break;

      case 'addProperties':
        for (const entry of Object.entries(action.extraData)) {
          currentState[entry[0]] = entry[1];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        continue;
    }

    states.push(Object.assign({}, currentState));
  }

  return states;
}

module.exports = transformStateWithClones;
