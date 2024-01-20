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
    if (action.type === 'addProperties') {
      newState = {
        ...newState, ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      const tempState = { ...newState };

      for (const keyToRemove of action.keysToRemove) {
        delete tempState[keyToRemove];
      }
      newState = { ...tempState };
    }

    if (action.type === 'clear') {
      newState = {};
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
