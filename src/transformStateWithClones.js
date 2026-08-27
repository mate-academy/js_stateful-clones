'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const historyState = [];

  for (const action of actions) {
    let copyState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        copyState = {
          ...copyState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    historyState.push(copyState);
    currentState = copyState;
  }

  return historyState;
}

module.exports = transformStateWithClones;
