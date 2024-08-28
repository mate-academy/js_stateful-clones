'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const allStates = [];
  const realState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(realState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(realState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(realState);
        break;
    }

    allStates.push(Object.assign({}, realState));
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
