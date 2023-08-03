'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const remove = (state, keysToRemove) => {
  for (const key of keysToRemove) {
    delete state[key];
  }
};

const clearKey = (state) => {
  for (const key in state) {
    delete state[key];
  }
};

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        remove(stateCopy, keysToRemove);
        break;

      case 'clear':
        clearKey(stateCopy);
        break;

      default:
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
