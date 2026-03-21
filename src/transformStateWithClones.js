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
      case 'addProperties':
        const { extraData } = action;

        currentState = { ...currentState, ...extraData };
        result.push(currentState);
        break;
      case 'clear':
        currentState = {};
        result.push(currentState);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        currentState = { ...currentState };

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        result.push(currentState);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
