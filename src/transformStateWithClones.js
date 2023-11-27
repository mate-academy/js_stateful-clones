'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const arrayStates = [];

  for (let k = 0; k < actions.length; k++) {
    const action = actions[k];

    if (action.type === 'addProperties') {
      const addKeys = action.extraData;

      Object.assign(copyState, addKeys);
    }

    if (action.type === 'removeProperties') {
      const removeKeys = action.keysToRemove;

      for (let i = 0; i < removeKeys.length; i++) {
        delete copyState[removeKeys[i]];
      }
    }

    if (action.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
    }

    arrayStates[k] = { ...copyState };
  }

  return arrayStates;
}

module.exports = transformStateWithClones;
