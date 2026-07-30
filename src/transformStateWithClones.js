'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];

  for (const action of actions) {
    let temporaryState = {};

    if (results.length) {
      temporaryState = { ...results[results.length - 1] };
    } else {
      temporaryState = { ...state };
    }

    switch (action.type) {
      case 'addProperties':
        addProperties(temporaryState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(temporaryState, action.keysToRemove);
        break;

      default:
        clearProperties(temporaryState);
        break;
    }

    results.push(temporaryState);
  }

  return results;
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
