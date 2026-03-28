'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const answer = [];
  let currentState = { ...state };

  for (const element of actions) {
    switch (element.type) {
      case 'addProperties':
        currentState = { ...currentState, ...element.extraData };
        break;

      case 'removeProperties':
        const newState = { ...currentState };

        for (const key of element.keysToRemove) {
          delete newState[key];
        }
        currentState = newState;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    answer.push(currentState);
  }

  return answer;
}

module.exports = transformStateWithClones;
