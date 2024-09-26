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

    switch (action.type) {
      case 'addProperties':
        const addKeys = action.extraData;

        Object.assign(copyState, addKeys);
        break;

      case 'removeProperties':
        const removeKeys = action.keysToRemove;

        for (let i = 0; i < removeKeys.length; i++) {
          delete copyState[removeKeys[i]];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }

    arrayStates[k] = { ...copyState };
  }

  return arrayStates;
}

module.exports = transformStateWithClones;
