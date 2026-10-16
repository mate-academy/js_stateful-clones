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
    switch (action.type) {
      case 'addProperties':
        copyState = addExtraData(copyState, action.extraData);
        break;

      case 'removeProperties':
        copyState = removeData(copyState, action.keysToRemove);
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(copyState);
  }

  function addExtraData(curState, addAction) {
    return Object.assign({}, curState, addAction);
  }

  function removeData(curState, keysToRemove) {
    const newState = {};

    for (const key in curState) {
      if (!keysToRemove.includes(key)) {
        newState[key] = curState[key];
      }
    }

    return newState;
  }

  return stateHistory; // write code here
}

module.exports = transformStateWithClones;
