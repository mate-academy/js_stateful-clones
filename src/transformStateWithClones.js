'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  let cloneState = Object.assign({}, state);
  const historyState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        cloneState = {
          ...cloneState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;
      case 'clear':
        cloneState = {};
        break;
    }

    historyState.push({ ...cloneState });
  }

  return historyState;
}

module.exports = transformStateWithClones;
