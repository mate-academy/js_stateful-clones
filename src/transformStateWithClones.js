'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let newState = { ...state };

  for (const action of actions) {
    newState = { ...newState };

    switch (action.type) {
      case 'addProperties':
        newState = addProperties(newState, action.extraData);
        break;

      case 'removeProperties':
        newState = removeProperties(newState, action.keysToRemove);
        break;

      case 'clear':
        newState = {};
        break;
    }

    statesHistory.push(newState);
  }

  return statesHistory;
}

/**
 * @param {Object} state
 * @param {string[]} keysToAdd
 *
 * @return {Object}
 */
function addProperties(state, keysToAdd) {
  const stateCopy = { ...state };

  return Object.assign(stateCopy, keysToAdd);
}

/**
 * @param {Object} state
 * @param {string[]} keysToRemove
 *
 * @return {Object}
 */
function removeProperties(state, keysToRemove) {
  const stateCopy = { ...state };

  keysToRemove.forEach((key) => delete stateCopy[key]);

  return stateCopy;
}

module.exports = transformStateWithClones;
