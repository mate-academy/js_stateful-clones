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
    currentState = deepCopy(currentState);

    states.push(currentState);

    if (action.type === 'clear') {
      deleteAllProperties(currentState);
    }

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      deleteProperties(currentState, action.keysToRemove);
    }
  }

  return states;
}

function deleteAllProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

function deleteProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function deepCopy(object) {
  const newObject = {};

  for (const key in object) {
    if (object[key] !== null && typeof object[key] === 'object') {
      newObject[key] = deepCopy(newObject);
    } else {
      newObject[key] = object[key];
    }
  }

  return newObject;
}

module.exports = transformStateWithClones;
