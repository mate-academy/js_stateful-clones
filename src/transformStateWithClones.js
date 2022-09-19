'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  const copyState = { ...state };

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(copyState, obj.extraData);

      resultArr.push({ ...copyState });
    }

    if (obj.type === 'removeProperties') {
      for (const word of obj.keysToRemove) {
        delete copyState[word];
      }

      resultArr.push({ ...copyState });
    }

    if (obj.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }

      resultArr.push({ ...copyState });
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
