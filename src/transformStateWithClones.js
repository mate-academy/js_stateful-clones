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

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        }
        break;
      case 'clear':
        currentState = {};
        break;
    }

    result.push(Object.assign({}, currentState));
  }

  return result;
}

module.exports = transformStateWithClones;
