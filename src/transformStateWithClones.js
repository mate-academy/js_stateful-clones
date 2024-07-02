'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const listOfStates = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(newState, action.extraData);
        listOfStates.push({ ...newState });
        break;
      case 'removeProperties':
        removeProperties(newState, action.keysToRemove);
        listOfStates.push({ ...newState });
        break;
      case 'clear':
        clear(newState);
        listOfStates.push({});
        break;
    }
  }

  return listOfStates;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
