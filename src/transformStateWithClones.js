'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  for (const param of actions) {
    if (param['type'] === 'addProperties') {
      stateClone = Object.assign(stateClone, param['extraData']);
    }

    if (param['type'] === 'removeProperties') {
      for (const i of param['keysToRemove']) {
        delete stateClone[i];
      }
    }

    if (param['type'] === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
