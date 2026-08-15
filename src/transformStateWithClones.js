'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(currentState);
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

function addProperties(copy, extraData) {
  Object.assign(copy, extraData);
}

function removeProperties(copy, keysToRemove) {
  for (const key of keysToRemove) {
    delete copy[key];
  }
}

function clearProperties(copy) {
  for (const key of Object.keys(copy)) {
    delete copy[key];
  }
}

module.exports = transformStateWithClones;
