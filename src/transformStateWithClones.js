'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
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
          const newState = { ...nextState };

          for (const key of action.keysToRemove) {
            delete newState[key];
          }
          nextState = newState;
        }
        break;
      default:
        break;
    }
    currentState = nextState;
  }

  return [currentState];
}

module.exports = transformStateWithClones;
