'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistory = [];

  actions.forEach((item) => {
    const { type, extraData, keysToRemove } = item;

    switch (type) {
      case 'addProperties':
        addProperties(stateCopy, extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, keysToRemove);
        break;

      case 'clear':
        clearProperties(stateCopy);
        break;

      default:
        break;
    }

    stateHistory.push({ ...stateCopy });
  });

  return stateHistory;
}

function addProperties(state, extraData) {
  return Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
