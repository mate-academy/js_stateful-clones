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
    //switch
    switch (action[i].type) {
      case 'addProperties':
        clonedState = {
          ...clonedState,
          ...action[i].extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action[i].keysToRemove) {
          delete clonedState[key];
        }
        break;

      case 'clear':
        clonedState = {};
        break;

      default:
        break;
    }


    newState.push(clonedState);
    currentState = clonedState;
  }

  return newState;
};

module.exports = transformStateWithClones;
