'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyArr = [];
  let localState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        localState = { ...localState, ...action.extraData };
        break;

      case 'removeProperties':
        localState = { ...localState };

        for (const key of action.keysToRemove) {
          delete localState[key];
        }
        break;

      case 'clear':
        localState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    historyArr.push(localState);
  }

  return historyArr;
}

module.exports = transformStateWithClones;
