'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      addProperties(newState, result, action.extraData);
    }

    if (action.type === 'removeProperties') {
      removeProperties(newState, result, action.keysToRemove);
    }

    if (action.type === 'clear') {
      clear(newState, result);
    }
  }

  return result;
}

function addProperties(newState, result, extraData) {
  Object.assign(newState, extraData);
  result.push({ ...newState });
}

function removeProperties(newState, result, keysToRemove) {
  keysToRemove.forEach((key) => {
    delete newState[key];
  });
  result.push({ ...newState });
}

function clear(newState, result) {
  for (const key in newState) {
    delete newState[key];
  }
  result.push({ ...newState });
}

module.exports = transformStateWithClones;
