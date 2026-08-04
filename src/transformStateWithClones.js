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
    if (action.type === 'addProperties') {
      localState = { ...localState, ...action.extraData };
      historyArr.push(localState);
    }

    if (action.type === 'removeProperties') {
      localState = { ...localState };

      for (const key of action.keysToRemove) {
        delete localState[key];
      }
      historyArr.push(localState);
    }

    if (action.type === 'clear') {
      localState = {};
      historyArr.push(localState);
    }
  }

  return historyArr;
}

module.exports = transformStateWithClones;
