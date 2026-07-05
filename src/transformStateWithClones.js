'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let historyOfStates = [];

  for (let action of actions) {
    let newState = { ...state};

    if (action.type === 'addProperties') {
      for (let key in action.extraData) {
        newState[key] = action.extraData[key];
      }

    historyOfStates.push(newState);
    }

    if (action.type === 'removeProperties') {
      for (let key of action.keysToRemove) {
        delete newState[key];
      }

    historyOfStates.push(newState);
    }

    if (action.type === 'clear') {
      for (let key in newState) {
        delete newState[key];
      }

    historyOfStates.push(newState);
    }
  }

  return historyOfStates;
}

module.exports = transformStateWithClones;
