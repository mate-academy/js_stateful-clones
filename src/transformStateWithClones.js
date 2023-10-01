'use strict';

/**
 * @param {Object} stateClone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateClone[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (let j = 0; j < action.keysToRemove.length; j++) {
          delete stateClone[action.keysToRemove[j]];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
    }
    stateArray.push(stateClone);
    stateClone = Object.assign({}, stateClone);
  }

  return stateArray;
}

module.exports = transformStateWithClones;
