/* eslint-disable no-const-assign */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let resultState = { ...state };
  const historyState = [];

  for (const action of actions) {
    let newState = { ...resultState };

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete newState[key];
          }
        }

        break;

      default:
        newState = { ...resultState };
        break;
    }

    historyState.push(newState);
    resultState = newState;
  }

  return historyState;
}

module.exports = transformStateWithClones;
