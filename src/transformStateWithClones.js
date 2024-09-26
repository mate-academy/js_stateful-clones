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
  const stateCopy = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateClone = {
          ...stateClone, ...action.extraData,
        };

        break;
      case 'removeProperties':
        for (const index of action.keysToRemove) {
          delete stateClone[index];
        }
        break;
      case 'clear':
        stateClone = {};

        break;
    }
    stateCopy.push({ ...stateClone });
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
