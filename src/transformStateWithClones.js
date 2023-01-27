'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // list of all states
  const newStates = [];

  // state that is modified by actions
  const recentState = { ...state };

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          recentState[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete recentState[key];
        }
        break;

      case 'clear':
      default:
        // make empty object
        for (const key in recentState) {
          delete recentState[key];
        }
        break;
    }
    newStates.push({ ...recentState });
  }

  return newStates;
}

module.exports = transformStateWithClones;
