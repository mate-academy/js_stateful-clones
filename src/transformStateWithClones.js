'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = Object.assign({}, state);
  const resultArr = [];

  // if (actions.length === 0) {
  //   return stateClone;
  // }

  for (const property of actions) {
    if (property.type === 'removeProperties') {
      for (const action of property.keysToRemove) {
        delete stateClone[action];
      }
    }

    if (property.type === 'addProperties') {
      Object.assign(stateClone, property.extraData);
    }

    if (property.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }
    resultArr.push({ ...stateClone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
