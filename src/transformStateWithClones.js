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
      for (const del in cloneOfState) {
        delete cloneOfState[del];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const y in actions[i].keysToRemove) {
        delete cloneOfState[actions[i].keysToRemove[y]];
      }
    }

    if (actions[i].type === 'addProperties') {
      Object.assign(cloneOfState, actions[i].extraData);
    }

    resultArray.push({ ...cloneOfState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
