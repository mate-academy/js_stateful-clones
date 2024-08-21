'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const statesArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        statesArray.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        statesArray.push({ ...stateClone });
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        statesArray.push({ ...stateClone });
        break;
    }
  }

  return statesArray;
}

module.exports = transformStateWithClones;
