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
    if (element.type === 'addProperties') {
      currentState = { ...currentState, ...element.extraData };
      answer.push(currentState);
    }

    if (element.type === 'removeProperties') {
      const newState = { ...currentState };

      for (const key of element.keysToRemove) {
        delete newState[key];
      }
      currentState = newState;
      answer.push(currentState);
    }

    if (element.type === 'clear') {
      currentState = {};
      answer.push(currentState);
    }
  }

  return answer;
}

module.exports = transformStateWithClones;
