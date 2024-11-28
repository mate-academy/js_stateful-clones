'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyArray = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) =>
          delete stateClone[key]
        );
        break;

      case 'clear':
        Object.keys(stateClone).forEach((key) =>
          delete stateClone[key]
        );
        break;

      default: return 'Incorrect data';
    }
    historyArray.push({ ...stateClone });
  }

  return historyArray;
}

module.exports = transformStateWithClones;
