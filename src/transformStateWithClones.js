'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateClone = {};

  Object.assign(stateClone, state);

  const resultStates = [];

  for (const action of actions) {
    const resultState = {};

    switch (action.type) {
      case 'addProperties':
        addProperties(stateClone, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateClone, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateClone);
        break;
    }

    Object.assign(resultState, stateClone);

    resultStates.push(resultState);
  }

  return resultStates;
}

function addProperties(stateClone, extraData) {
  Object.assign(stateClone, extraData);
}

function removeProperties(stateClone, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateClone[key];
  }
}

function clearProperties(stateClone) {
  for (const key in stateClone) {
    delete stateClone[key];
  }
}

module.exports = transformStateWithClones;
