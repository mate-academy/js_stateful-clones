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
    if (arr.type === 'addProperties') {
      Object.assign(stateNew, arr.extraData);
    }

    if (arr.type === 'removeProperties') {
      for (const keyToRemove of arr.keysToRemove) {
        delete stateNew[keyToRemove];
      }
    }

    if (arr.type === 'clear') {
      for (const key in stateNew) {
        delete stateNew[key];
      }
    }

    const clone = {
      ...stateNew,
    };

    resArr.push(clone);
  }

  return resArr;
}

module.exports = transformStateWithClones;
