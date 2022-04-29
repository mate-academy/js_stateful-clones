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

  for (const property of actions) {
    switch (property.type) {

      case 'removeProperties':
        for (const action of property.keysToRemove) {
          delete stateClone[action];
        }
        break;

      case 'addProperties':
        Object.assign(stateClone, property.extraData);
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }
    resultArr.push({ ...stateClone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
