'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    stateCopy = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        stateCopy = addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Unknown action type!');
    }

    statesHistory.push(stateCopy);
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
