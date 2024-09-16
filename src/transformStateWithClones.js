'use strict';

/**
 * @param {Object} cloneState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(cloneState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(cloneState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(cloneState);
        break;
    }
    resultArray.push({ ...cloneState });
  }

  return resultArray;
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
