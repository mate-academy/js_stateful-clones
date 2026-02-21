'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const updState = [];
  let currentState = state;

  for (const item of actions) {
    const action = item.type;

    switch (action) {
      case 'addProperties':
        currentState = { ...currentState, ...item.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of item.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    updState.push({ ...currentState });
  }

  return updState;
}

module.exports = transformStateWithClones;
