'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyArrayOfStates = [];
  const stateClone = { ...state };

  for (const ourAction of actions) {
    switch (ourAction.type) {
      case 'addProperties':
        Object.assign(stateClone, ourAction.extraData);
        break;

      case 'removeProperties':
        for (const itemToDelete of ourAction.keysToRemove) {
          delete stateClone[itemToDelete];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    historyArrayOfStates.push({ ...stateClone });
  }

  return historyArrayOfStates;
}

module.exports = transformStateWithClones;
