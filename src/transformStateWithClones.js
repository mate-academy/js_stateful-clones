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
  let recentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        recentState = {
          ...recentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete recentState[key];
        }
        break;

      default:
        recentState = {};
        break;
    }
    newStates.push({ ...recentState });
  }

  return newStates;
}

module.exports = transformStateWithClones;
