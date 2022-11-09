'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const arrayOfObjects = [];

  for (let i = 0; i < actions.length; i++) {
    const oneElement = actions[i];

    if (oneElement.type === 'addProperties') {
      Object.assign(newState, oneElement.extraData);
    } else if (oneElement.type === 'removeProperties') {
      const keysRemoving = oneElement.keysToRemove;

      for (let m = 0; m < keysRemoving.length; m++) {
        delete newState[`${keysRemoving[m]}`];
      }
    } else if (oneElement.type === 'clear') {
      for (const keyA in newState) {
        delete newState[keyA];
      }
    }

    arrayOfObjects[i] = { ...newState };
  }

  return arrayOfObjects;
}

module.exports = transformStateWithClones;
