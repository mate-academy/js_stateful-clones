'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          currentState = { ...currentState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          currentState = { ...currentState };

          for (const key of action.keysToRemove) {
            delete currentState[key];
          }
        }
        break;

      default:
        currentState = { ...currentState };
    }

    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
