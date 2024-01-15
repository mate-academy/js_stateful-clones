'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultState = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = {
          ...currentState, ...extraData,
        };
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (Object.prototype.hasOwnProperty.call(currentState, key)) {
            delete currentState[key];
          }
        }
        break;
      default:
    }

    resultState.push({ ...currentState });
  }

  return resultState;
}

module.exports = transformStateWithClones;
