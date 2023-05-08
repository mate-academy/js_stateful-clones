'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrayOfStates = [];

  const pushState = (array, stateCloneObject) => {
    array.push({ ...stateCloneObject });
  };

  const addProps = (inputState, dataObj) => {
    for (const [key, value] of Object.entries(dataObj)) {
      inputState[key] = value;
    }
    pushState(arrayOfStates, inputState);
  };

  const removeProps = (inputState, dataArray) => {
    for (const key of dataArray) {
      delete inputState[key];
    }
    pushState(arrayOfStates, inputState);
  };

  const clear = (inputState) => {
    for (const key in inputState) {
      delete inputState[key];
    }
    pushState(arrayOfStates, inputState);
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProps(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProps(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clear(stateCopy);
        break;

      default:
        throw new Error('given some action that is undefined');
    }
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
