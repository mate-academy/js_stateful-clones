'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  /**
 * @param {Object} state
 * @param {Object[]} actions
 */
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      // to add properties to "copyState"
      case 'addProperties':
        addProperties(copyState, action.extraData);
        break;

      // to remove properties to "copyState"
      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        break;

      // to clear properties to "copyState"
      case 'clear':
        clearProperties(copyState);
        break;
    }

    // to add the results to the array "result"
    result.push({ ...copyState });
  }

  return result;
}

// This function adds properties to "copyState"
function addProperties(copyState, extraData) {
  Object.assign(copyState, extraData);
}

// This function removes properties to "copyState"
function removeProperties(copyState, keysToRemove) {
  for (const key of keysToRemove) {
    delete copyState[key];
  }
}

// This function clears properties to "copyState"
function clearProperties(copyState) {
  for (const key in copyState) {
    delete copyState[key];
  }
}

module.exports = transformStateWithClones;
