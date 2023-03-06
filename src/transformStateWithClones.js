'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const actionProperties of actions) {
    const { type, extraData, keysToRemove } = actionProperties;

    if (type === 'addProperties') {
      Object.assign(newState, extraData);
      result.push({ ...newState });
    }

    if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete newState[key];
      }
      result.push({ ...newState });
    }

    if (type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      result.push({ ...newState });
      newState = {};
    }
  }

  return result;
}

module.exports = transformStateWithClones;
