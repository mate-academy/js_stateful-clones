'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const addProperties = (newState, extraData) => {
    for (const key in extraData) {
      newState[key] = extraData[key];
    }
  };

  const removeProperties = (newState, KeysToRemove) => {
    for (const value of KeysToRemove) {
      delete newState[value];
    }
  };

  const clear = (newState) => {
    for (const key in newState) {
      delete newState[key];
    }
  };

  const states = [];
  let currentState = { ...state };

  for (const obj of actions) {
    const newState = { ...currentState };

    switch (obj.type) {
      case 'addProperties':
        addProperties(newState, obj.extraData);
        break;

      case 'removeProperties':
        removeProperties(newState, obj.keysToRemove);
        break;

      case 'clear':
        clear(newState);
        break;
    }
    states.push(newState);
    currentState = newState;
  }

  return states;
}

module.exports = transformStateWithClones;
