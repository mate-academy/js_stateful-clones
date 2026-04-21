'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        result.push(currentState);
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        result.push(currentState);
        break;

      case 'removeProperties': {
        const nextState = {};

        for (const key in currentState) {
          if (!action.keysToRemove.includes(key)) {
            nextState[key] = currentState[key];
          }
        }

        currentState = nextState;
        result.push(currentState);
        break;
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
