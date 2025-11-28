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
    let nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        if (action.extraData) {
          nextState = { ...nextState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (action.keysToRemove) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      default:
        break;
    }

    currentState = nextState;
    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
