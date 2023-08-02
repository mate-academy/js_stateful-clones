'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function stateClear(state) {
  for (const prop in state) {
    delete state[prop];
  }
}

function stateRemoveProperty(state, keysArr) {
  for (const key of keysArr) {
    delete state[key];
  }
}

function transformStateWithClones(state, actions) {
  const statesArray = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        stateRemoveProperty(currentState, action.keysToRemove);
        break;

      case 'clear':
        stateClear(currentState);
        break;

      default:
        break;
    }

    statesArray.push({ ...currentState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
