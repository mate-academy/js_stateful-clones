'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneActions = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);

        break;

      case 'removeProperties':
        currentState = Object.assign({}, currentState);

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }

        break;

      case 'clear':
        currentState = {};

        break;

      default:
        break;
    }

    cloneActions.push(currentState);
  }

  return cloneActions;
}

module.exports = transformStateWithClones;
