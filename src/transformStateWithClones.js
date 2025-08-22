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

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        const newState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        currentState = newState;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Unexpected action');
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
