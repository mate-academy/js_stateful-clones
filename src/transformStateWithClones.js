'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [state];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...extraData,
        };
        break;
      case 'removeProperties':
        keysToRemove.forEach((key) => delete currentState[key]);
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }
    result.push({ ...currentState });
  }

  return result.slice(1);
}

module.exports = transformStateWithClones;
