'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const removeKeys = (state, keysToRemove) => {
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
        removeKeys(stateCopy, keysToRemove);
        break;

      case 'clear':
        clearKey(stateCopy);
        break;

      default:
        throw new Error('Add correct state or action!');
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
