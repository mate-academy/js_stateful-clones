'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      const stateKeys = Object.keys(newState);

      for (const key of stateKeys) {
        delete newState[key];
      }

      result.push({ ...newState });
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      result.push({ ...newState });
    } else if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);

      result.push({ ...newState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
