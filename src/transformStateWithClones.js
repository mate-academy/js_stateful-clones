'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const action of actions) {
    const keysToRemove = action.keysToRemove;
    const extraData = action.extraData;

    if (action.type === 'addProperties') {
      newState = {
        ...newState, ...extraData,
      };
    }

    if (action.type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete newState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
