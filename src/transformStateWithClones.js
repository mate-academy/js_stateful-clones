'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneOfState = { ...state };
  const resultArray = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      Object.keys(cloneOfState).forEach(key => delete cloneOfState[key]);
    }

    if (actions[i].type === 'removeProperties') {
      for (let y = 0; y < actions[i].keysToRemove.length; y++) {
        if (cloneOfState.hasOwnProperty(actions[i].keysToRemove[y])) {
          delete cloneOfState[actions[i].keysToRemove[y]];
        }
      }
    }

    if (actions[i].type === 'addProperties') {
      for (const a in actions[i].extraData) {
        cloneOfState[a] = actions[i].extraData[a];
      }
    }

    resultArray.push({ ...cloneOfState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
