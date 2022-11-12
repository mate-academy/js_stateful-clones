'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const returnedArray = [];
  const cloneState = { ...state };
  // returnedArray.push( {...state });

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(cloneState, obj.extraData);
    } else if (obj.type === 'removeProperties') {
      for (const i of obj.keysToRemove) {
        if (cloneState.hasOwnProperty(i)) {
          delete cloneState[i];
        }
      }
    } else if (obj.type === 'clear') {
      for (const i in cloneState) {
        delete cloneState[i];
      }
    }
    returnedArray.push({ ...cloneState });
  }

  return returnedArray;
}

module.exports = transformStateWithClones;
