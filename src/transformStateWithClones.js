'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonedState = { ...state };
  const results = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clonedState, action.extraData);
      results.push({ ...clonedState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clonedState[key];
      }
      results.push({ ...clonedState });
    }

    if (action.type === 'clear') {
      clonedState = {};
      results.push({ ...clonedState });
    }
  }

  return results;
}

module.exports = transformStateWithClones;
