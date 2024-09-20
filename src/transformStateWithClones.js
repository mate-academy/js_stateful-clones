'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesHistory = [];
  let newState = state;

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
  return Object.assign(state, keysToAdd);
}

/**
 * @param {Object} state
 * @param {string[]} keysToRemove
 *
 * @return {Object}
 */
function removeProperties(state, keysToRemove) {
  keysToRemove.forEach((key) => delete state[key]);

  return state;
}

module.exports = transformStateWithClones;
