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

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      Object.assign(stateClone, obj.extraData);
    }

    if (obj.type === 'removeProperties') {
      for (const keys of obj.keysToRemove) {
        delete stateClone[keys];
      }
    }

    if (obj.type === 'clear') {
      stateClone = {};
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
