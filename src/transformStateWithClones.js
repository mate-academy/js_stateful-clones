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
    switch (param.type) {
      case 'addProperties':
        stateClone = Object.assign(stateClone, param.extraData);
        break;

      case 'removeProperties':
        for (const i of param.keysToRemove) {
          delete stateClone[i];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
