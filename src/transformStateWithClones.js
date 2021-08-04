'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allCloneStates = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }

        break;

      case 'clear':
        stateClone = {};
    }

    allCloneStates.push({ ...stateClone });
  }

  return allCloneStates;
}

module.exports = transformStateWithClones;
