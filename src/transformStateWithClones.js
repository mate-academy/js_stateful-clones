'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arrayOfObject = [];

  for (let i = 0; i < actions.length; i++) {
    const oneElement = actions[i];

    switch (oneElement.type) {
      case 'addProperties':
        Object.assign(newState, oneElement.extraData);
        break;

      case 'removeProperties':
        const KeysRemoving = oneElement.keysToRemove;

        for (let b = 0; b < KeysRemoving.length; b++) {
          delete newState[`${KeysRemoving[b]}`];
        };
        break;

      case 'clear':
        for (const keys in newState) {
          delete newState[keys];
        }
    }

    arrayOfObject[i] = { ...newState };
  }

  return arrayOfObject;
}

module.exports = transformStateWithClones;
