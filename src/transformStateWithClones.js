'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateClone = { ...state };
  const storageActions = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete stateClone[keyToRemove];
        }
        break;
      case 'clear':
        stateClone = {};
        break;
    }
    storageActions.push({ ...stateClone });
  }

  return storageActions;
}

module.exports = transformStateWithClones;
