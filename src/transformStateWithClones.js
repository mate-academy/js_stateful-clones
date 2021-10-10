'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const resultArr = [];
  let copyState = { ...state };

  for (const obj of actions) {
    const { type, extraData, keysToRemove } = obj;

    if (type === 'addProperties') {
      copyState = Object.assign(copyState, extraData);
      resultArr.push({ ...copyState });
    }

    if (type === 'removeProperties') {
      for (const property of keysToRemove) {
        delete copyState[property];
      }

      resultArr.push({ ...copyState });
    }

    if (type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }

      resultArr.push({ ...copyState });
    }
  }

  return resultArr;
}

module.exports = transformStateWithClones;
