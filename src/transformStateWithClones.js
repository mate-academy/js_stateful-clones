'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;
    let newState;

    switch (type) {
      case 'addProperties':
        newState = Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        newState = { ...copyState };

        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = { ...copyState };

        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        stateHistory.push({ unknowingACtion: action });
        break;
    }

    stateHistory.push(newState);
    copyState = { ...newState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
