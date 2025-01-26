'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const tState = [];
  let currentState = structuredClone(state);

  for (const action of actions) {
    const transformedState = structuredClone(currentState);

    switch (action.type) {
      case 'addProperties':
        addProperties(transformedState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(transformedState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(transformedState);
        break;
    }

    tState.push(transformedState);
    currentState = transformedState;
  }

  return tState;
}

function addProperties(currentState, extraData) {
  Object.assign(currentState, extraData);
}

function removeProperties(currentState, keysToRemove) {
  for (const key of keysToRemove) {
    delete currentState[key];
  }
}

function clearProperties(currentState) {
  for (const key in currentState) {
    delete currentState[key];
  }
}

module.exports = transformStateWithClones;
