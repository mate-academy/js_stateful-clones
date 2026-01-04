'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          nextState = { ...currentState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        continue;
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
