'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultArr = [];
  let stateClone = { ...state };

  for (const objAc of actions) {
    switch (objAc.type) {
      case 'clear':
        stateClone = {};
        break;

      case 'removeProperties':
        for (const el of objAc.keysToRemove) {
          delete stateClone[el];
        }
        break;

      case 'addProperties':
        Object.assign(stateClone, objAc.extraData);
        break;
    }
    resultArr.push({ ...stateClone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
