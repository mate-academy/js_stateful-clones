'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const newState = { ...state };

  for (const keys in actions) {
    if (actions[keys].type === 'addProperties') {
      Object.assign(newState, actions[keys].extraData);
    }

    if (actions[keys].type === 'removeProperties') {
      const properties = actions[keys].keysToRemove;

      for (let i = 0; i < properties.length; i++) {
        delete newState[properties[i]];
      }
    }

    if (actions[keys].type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    const updatedState = { ...newState };

    stateHistory.push(updatedState);
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
