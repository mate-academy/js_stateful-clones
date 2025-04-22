'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = { ...currentState };
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        break;
    }

    currentState = nextState;
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
