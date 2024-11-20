'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const transformedState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData, transformedState);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove, transformedState);
        break;

      case 'clear':
        clear(stateCopy, transformedState);
        break;
    }
  }

  return transformedState;
}

function addProperties(massive, extraData, newMassive) {
  Object.assign(massive, extraData);
  newMassive.push({ ...massive });
}

function removeProperties(massive, keysToRemove, newMassive) {
  for (const param of keysToRemove) {
    delete massive[param];
  }
  newMassive.push({ ...massive });
}

function clear(massive, newMassive) {
  for (const key in massive) {
    delete massive[key];
  }
  newMassive.push({ ...massive });
}

module.exports = transformStateWithClones;
