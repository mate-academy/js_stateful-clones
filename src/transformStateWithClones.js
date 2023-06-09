'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const finalArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        finalArray.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const attr of action.keysToRemove) {
          delete stateClone[attr];
        }
        finalArray.push({ ...stateClone });
        break;
      case 'clear':
        for (const attr in stateClone) {
          delete stateClone[attr];
        }
        finalArray.push({ ...stateClone });
        break;
    }
  }

  return finalArray;
}

module.exports = transformStateWithClones;
