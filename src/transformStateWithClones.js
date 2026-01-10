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
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const nextState = { ...currentState };

        for (const keyToRemove of action.keysToRemove) {
          delete nextState[keyToRemove];
        }
        currentState = nextState;
        break;
    }
    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
