'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const finalStates = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => {
          delete currentState[key];
        });

        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }

        break;
      default:
        break;
    }

    finalStates.push({ ...currentState });
    currentState = { ...currentState };
  });

  return finalStates;
}

module.exports = transformStateWithClones;
