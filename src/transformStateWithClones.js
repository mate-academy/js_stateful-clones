'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const setOfStates = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        newState = { ...newState, ...extraData };
        break;
      case 'removeProperties':
        newState = { ...newState };

        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;
      default:
        break;
    }
    setOfStates.push(newState);
  }

  return setOfStates;
}

module.exports = transformStateWithClones;
