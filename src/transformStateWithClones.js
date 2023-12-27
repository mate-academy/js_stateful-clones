'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(newState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(newState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(newState);
        break;
    }

    result.push({ ...newState });
  }

  return result;
}

function addProperties(newState, extraData) {
  Object.assign(newState, extraData);
}

function removeProperties(newState, keysToRemove) {
  for (const key of keysToRemove) {
    delete newState[key];
  }
}

function clearProperties(newState) {
  for (const key in newState) {
    delete newState[key];
  }
}

module.exports = transformStateWithClones;
