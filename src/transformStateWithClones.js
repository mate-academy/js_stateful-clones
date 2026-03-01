'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const historyOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(copy, action.keysToRemove);
        break;

      case 'clear':
        clear(copy);
      
        break;
    }

    historyOfStates.push({ ...copy });
  }

  return historyOfStates;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData); 
}

function removeProperties(state, keysToRemove) {
  if (!keysToRemove || keysToRemove.length === 0) {
    return;
  }

  for (const keyToRemove of keysToRemove) {
    if (state[keyToRemove]) {
      delete state[keyToRemove];
    }
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
