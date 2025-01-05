'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);

        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);

        break;

      case 'clear':
        currentState = clear(currentState);

        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

function addProperties(state, extraData) {
  return { ...state, ...extraData };
}

function removeProperties(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clear(state) {
  return {};
}

module.exports = transformStateWithClones;
