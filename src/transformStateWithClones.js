'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        currentState = addProperties(currentState, actions[i].extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, actions[i].keysToRemove);
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

function addProperties(currentState, extraData) {
  return Object.assign({}, currentState, extraData);
}

function removeProperties(currentState, keysToRemove) {
  const newState = { ...currentState };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

module.exports = transformStateWithClones;
