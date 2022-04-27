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
    switch (actions[i].type) {
      case 'clear':
        for (const del in cloneOfState) {
          delete cloneOfState[del];
        }
        break;
      case 'removeProperties':
        for (const y in actions[i].keysToRemove) {
          delete cloneOfState[actions[i].keysToRemove[y]];
        }
        break;
      case 'addProperties':
        Object.assign(cloneOfState, actions[i].extraData);
    }
    resultArray.push({ ...cloneOfState });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
