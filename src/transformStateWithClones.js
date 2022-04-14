'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resArr = [];
  const stateNew = {
    ...state,
  };

  for (const arr of actions) {
    switch (arr.type) {
      case 'addProperties':
        Object.assign(stateNew, arr.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of arr.keysToRemove) {
          delete stateNew[keyToRemove];
        };
        break;
      case 'clear':
        for (const key in stateNew) {
          delete stateNew[key];
        };
        break;
      default:
        continue;
    }

    resArr.push({
      ...stateNew,
    });
  }

  return resArr;
}

module.exports = transformStateWithClones;
