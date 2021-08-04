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

  for (const ourObject of actions) {
    switch (ourObject.type) {
      case 'addProperties':
        Object.assign(stateClone, ourObject.extraData);
        break;

      case 'removeProperties':
        for (let i = 0; i < ourObject.keysToRemove.length; i++) {
          delete stateClone[ourObject.keysToRemove[i]];
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
