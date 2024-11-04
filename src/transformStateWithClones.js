'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objectHistory = [];
  const stateCopy = { ...state };

  for (const object of actions) {
    const { type } = object;

    if (type === 'addProperties') {
      const { extraData } = object;

      Object.assign({ stateCopy }, extraData);
      objectHistory.push(stateCopy);
    }

    if (type === 'removeProperties') {
      const { keysToRemove } = object;

      for (const key of keysToRemove) {
        delete stateCopy[key];
      }
      objectHistory.push(stateCopy);
    }

    if (type === 'clear') {
      for (const key of Object.keys(state)) {
        delete stateCopy[key];
      }
      objectHistory.push(stateCopy);
    }
  }

  return objectHistory;
}

module.exports = transformStateWithClones;
