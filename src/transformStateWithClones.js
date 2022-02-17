'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const resultArr = [];

  for (const keys of actions) {
    switch (keys.type) {
      case 'addProperties':
        Object.assign(copyState, keys.extraData);
        break;

      case 'removeProperties':
        for (const key of keys.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    resultArr.push({ ...copyState });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
