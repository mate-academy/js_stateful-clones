'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArr = [];
  let stateClone = { ...state };

  for (const ac of actions) {
    if (ac.type === 'addProperties') {
      Object.assign(stateClone, ac.extraData);
    }

    if (ac.type === 'removeProperties') {
      for (const key of ac.keysToRemove) {
        delete stateClone[key];
      }
    }

    if (ac.type === 'clear') {
      stateClone = {};
    }

    resultArr.push({ ...stateClone });
  }

  return resultArr;
}

module.exports = transformStateWithClones;
