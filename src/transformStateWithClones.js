'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };

  const eachStateResult = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        eachStateResult.push({ ...currentState });
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        eachStateResult.push({ ...currentState });
        break;

      case 'clear':
        currentState = clear(currentState);
        eachStateResult.push({ ...currentState });
        break;

      default:
        break;
    }
  }

  return eachStateResult;
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
