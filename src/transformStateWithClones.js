'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const allStates = [];
  let currentState = { ...state };

  for (const act of actions) {
    const stateClone = { ...currentState };

    switch (act.type) {
      case 'addProperties':
        addProperties(stateClone, act.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateClone, act.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateClone);
        break;

      default:
        break;
    }

    allStates.push({ ...stateClone });
    currentState = stateClone;
  }

  return allStates;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
