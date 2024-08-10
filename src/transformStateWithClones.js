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
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        for (const key of keysToRemove) {
          delete currentState[key];
        }

        break;

      case 'clear':
        currentState = {};
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
