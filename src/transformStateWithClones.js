'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyArr = [];
  let startStateCopy = { ...state };

  for (const action of actions) {
    let newState = { ...startStateCopy };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        historyArr.push(newState);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        historyArr.push(newState);
        break;

      case 'clear':
        newState = {};
        historyArr.push(newState);
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    startStateCopy = newState;
  }

  return historyArr;
}

module.exports = transformStateWithClones;
