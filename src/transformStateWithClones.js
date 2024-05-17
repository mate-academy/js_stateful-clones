'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arrayStates = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData)
    } else if (action.type === 'keysToRemove') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else {
      newState = {};
    }

    arrayStates.push({ ...newState });
  }

  return arrayStates
}

module.exports = transformStateWithClones;
