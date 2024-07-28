'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const massiveToReturn = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(massiveToReturn, stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(massiveToReturn, stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(massiveToReturn, stateCopy);
        break;
    }
    massiveToReturn.push({ ...stateCopy });
  }

  return massiveToReturn;
}

function addProperties(massiveToReturn, stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(massiveToReturn, stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }
}

function clearProperties(massiveToReturn, stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
}

module.exports = transformStateWithClones;
