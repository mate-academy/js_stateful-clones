'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];

  for (const action of actions) {
    const indexOfLastState = allStates.length - 1;
    const lastState =
      indexOfLastState >= 0 ? allStates[indexOfLastState] : { ...state };
    const currentState = { ...lastState };

    switch (true) {
      case action.type === 'addProperties':
        for (const key in action.extraData) {
          if (Object.hasOwn(currentState, key)) {
            delete currentState[key];
          }

          currentState[key] = action.extraData[key];
        }

        break;

      case action.type === 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }

        break;

      case action.type === 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }

        break;

      default:
        break;
    }

    allStates.push(currentState);
  }

  return allStates;
}

module.exports = transformStateWithClones;
