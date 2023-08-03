'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const keyToRemove = (state, action) => {
  for (const key of action) {
    delete state[key];
  }
};

const keysToClear = (state) => {
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
        keyToRemove(stateCopy, keysToRemove);
        break;

      case 'clear':
        keysToClear(stateCopy);
        break;

      default:
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
