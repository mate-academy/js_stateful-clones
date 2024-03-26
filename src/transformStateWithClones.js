'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyOfStates = [];
  let currentState = { ...state };

  for (const action of actions) {
    let clonedState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        break;

      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }
        clonedState = {};
        break;

      default:
        break;
    }

    historyOfStates.push(clonedState);
    currentState = clonedState;
  }

  return historyOfStates;
}

module.exports = transformStateWithClones;
