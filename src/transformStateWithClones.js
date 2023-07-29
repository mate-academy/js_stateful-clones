'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = Object.assign({}, state);

  for (const value of actions) {
    switch (value.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = Object.assign({}, currentState, value.extraData);

        break;

      case 'removeProperties':
        for (const key of value.keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        }

        break;

      default:
        break;
    }
    result.push(Object.assign({}, currentState));
  }

  return result;
}

module.exports = transformStateWithClones;
