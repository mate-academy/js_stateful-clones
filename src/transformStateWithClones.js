'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const clone = Object.assign({}, state);

  for (const action of actions) {
    const [actionType, removeArr, extraData] = [
      action.type, action.keysToRemove, action.extraData];

    switch (actionType) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const removeProp of removeArr) {
          delete clone[removeProp];
        };
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }
    resultArr.push({ ...clone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
