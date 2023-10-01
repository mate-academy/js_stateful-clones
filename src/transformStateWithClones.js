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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          stateClone[key] = actions[i].extraData[key];
        }
        stateArray.push(stateClone);
        stateClone = Object.assign({}, stateClone);
        break;
      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          delete stateClone[actions[i].keysToRemove[j]];
        }
        stateArray.push(stateClone);
        stateClone = Object.assign({}, stateClone);
        break;
      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        stateArray.push(stateClone);
        stateClone = Object.assign({}, stateClone);
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
