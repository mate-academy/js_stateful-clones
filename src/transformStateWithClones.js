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
  const stateCopyArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateClone = Object.assign(stateClone, action.extraData);
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
    stateCopyArray.push({ ...stateClone });
  }

  return stateCopyArray;
}
module.exports = transformStateWithClones;
