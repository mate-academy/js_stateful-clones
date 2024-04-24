'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copyState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        break;

      default:
        clearProperties(copyState);
    }
    result.push({ ...copyState });
  }

  return result;
}

function addProperties(newState, extraData) {
  Object.assign(newState, extraData);
}

function removeProperties(newState, keysToRemove) {
  for (const value of keysToRemove) {
    delete newState[value];
  }
}

function clearProperties(newState) {
  for (const key in newState) {
    delete newState[key];
  }
}

module.exports = transformStateWithClones;
