'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const transformLogState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(newState, action.extraData);
        transformLogState.push({ ...newState });
        break;

      case 'removeProperties':
        removeProperties(newState, action.keysToRemove);
        transformLogState.push({ ...newState });
        break;

      case 'clear':
        clearProperties(newState);
        transformLogState.push({ ...newState });
        break;
    }
  }

  return transformLogState;
}

function addProperties(newState, extraData) {
  Object.assign(newState, extraData);
}

function removeProperties(newState, keysToRemove) {
  for (const key of keysToRemove) {
    delete newState[key];
  }
}

function clearProperties(newState) {
  for (const key in newState) {
    delete newState[key];
  }
}

module.exports = transformStateWithClones;
