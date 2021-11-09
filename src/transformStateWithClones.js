'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
    }

    allStates.push({ ...currentState });
  }

  return allStates;
}

module.exports = transformStateWithClones;
