'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changedState = { ...state };
  const stateHistory = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(changedState, obj.extraData);
      stateHistory.push({ ...changedState });
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        if (changedState[key] !== undefined) {
          delete changedState[key];
        }
      }
      stateHistory.push({ ...changedState });
    }

    if (obj.type === 'clear') {
      for (const key in changedState) {
        delete changedState[key];
      }
      stateHistory.push({});
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
