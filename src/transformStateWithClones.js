'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let index = 0;

  for (const action of actions) {
    const newState = {};

    if (index === 0) {
      Object.assign(newState, state);
    } else {
      Object.assign(newState, stateArray[index - 1]);
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const propertie of action.keysToRemove) {
        delete newState[propertie];
      }
    }

    if (action.type === 'clear') {
      if (Object.keys(newState).length > 0) {
        for (const key in newState) {
          delete newState[key];
        }
      }
    }

    index++;
    stateArray.push(newState);
  }

  return stateArray;
}

module.exports = transformStateWithClones;
