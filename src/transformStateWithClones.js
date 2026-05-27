'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, action) => {
  let currentState = { ...state };
  const newState = [];

  for (let i = 0; i < action.length; i++) {
    let clonedState = { ...currentState };

    if (action[i].type === 'addProperties') {
      clonedState = {
        ...clonedState,
        ...action[i].extraData,
      };
    }

    if (action[i].type === 'removeProperties') {
      for (const key of action[i].keysToRemove) {
        delete clonedState[key];
      }
    }

    if (action[i].type === 'clear') {
      clonedState = {};
    }

    newState.push(clonedState);
    currentState = clonedState;
  }

  return newState;
};

module.exports = transformStateWithClones;
