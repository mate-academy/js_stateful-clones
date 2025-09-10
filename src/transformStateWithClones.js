'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const historyState = [];
  let currentState = { ...state };

  for (const act of actions) {
    const newState = { ...currentState };

    switch (act.type) {
      case 'addProperties':
        Object.assign(newState, act.extraData);
        historyState.push(newState);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete newState[key];
        }
        historyState.push(newState);
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        historyState.push(newState);
        break;
    }

    currentState = newState;
  }

  return historyState;
}

module.exports = transformStateWithClones;
