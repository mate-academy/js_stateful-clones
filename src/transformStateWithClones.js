'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(action.extraData, currentState);
        break;
      case 'removeProperties':
        currentState = removeKeys(action.keysToRemove, currentState);
        break;
      case 'clear':
        currentState = clearProperties(currentState);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    states.push(currentState);
  }

  return states;
}

function addProperties(newPropeties, state) {
  return { ...state, ...newPropeties };
}

function removeKeys(keysToRemove, state) {
  const newObject = {};

  for (const key of Object.keys(state)) {
    if (!keysToRemove.includes(key)) {
      newObject[key] = state[key];
    }
  }

  return newObject;
}

function clearProperties() {
  return {};
}

module.exports = transformStateWithClones;
