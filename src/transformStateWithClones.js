'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateModified = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateModified, action.extraData);
      result.push({ ...stateModified });
    }

    if (action.type === 'removeProperties') {
      const arr = action.keysToRemove;

      for (const key of arr) {
        delete stateModified[key];
      }

      result.push({ ...stateModified });
    }

    if (action.type === 'clear') {
      for (const key in stateModified) {
        delete stateModified[key];
      }

      result.push({ ...stateModified });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
