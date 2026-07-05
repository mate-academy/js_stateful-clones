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
    if (action.type === 'addProperties') {
      for (let key in action.extraData) {
        state[key] = action.extraData[key];
      }

    historyOfStates.push(state);
    }

    if (action.type === 'removeProperties') {
      for (let key of action.keysToRemove) {
        delete state[key];
      }

    historyOfStates.push(state);
    }

    if (action.type === 'clear') {
      for (let key in state) {
        delete state[key];
      }

    historyOfStates.push(state);
    }
  }

  return historyOfStates;
}

module.exports = transformStateWithClones;
