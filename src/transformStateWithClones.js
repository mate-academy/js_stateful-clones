'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const arrayStates = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData)
    } else if (action.type === 'keysToRemove') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
    } else {
      stateClone = {};
    }

    arrayStates.push({ ...stateClone });
  }

  return arrayStates
}

module.exports = transformStateWithClones;
