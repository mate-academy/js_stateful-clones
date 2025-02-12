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
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const stateCopy = {};

        for (const key in currentState) {
          if (!action.keysToRemove.includes(key)) {
            stateCopy[key] = currentState[key];
          }
        }
        currentState = stateCopy;
        break;
      }

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
