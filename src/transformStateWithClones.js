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
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = Object.assign({}, currentState);

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
        break;
    }

    result.push(Object.assign({}, currentState));
  }

  return result;
}

module.exports = transformStateWithClones;
